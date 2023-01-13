import cfg
import os
import shutil
import argparse

# 获取参数，若update为真，完全刷新
parser = argparse.ArgumentParser()
parser.add_argument('--update', '-u', action='store_true')
args = parser.parse_args()
update = args.update

# 获取路径
PATH_SITE = cfg.PATH_SITE
PATH_QN = cfg.PATH_QN
if not os.path.exists(PATH_QN):
    os.makedirs(PATH_QN)
PATH_QN_RES = cfg.PATH_QN_RES
PATH_QN_LOG = cfg.PATH_QN_LOG
PATH_SITE_PUB = cfg.PATH_SITE_PUB

# 完全刷新，删除site-pub文件夹中所有内容（不包括.git文件夹），删除bucket中的所有内容，重新生成site-pub后上传
if update:
    print('update totally')
    if os.path.exists(PATH_SITE_PUB):
        os.chdir(PATH_SITE_PUB)
        pub_files = os.listdir(PATH_SITE_PUB)
        for pub_file in pub_files:
            if pub_file == '.git': continue
            if os.path.isdir(pub_file):
                shutil.rmtree(pub_file)
            else:
                os.remove(pub_file)
    os.system(f'{cfg.QSHELL} listbucket {cfg.QN_BUCKET_NAME} -o {PATH_QN_LOG}')
    os.system(f'{cfg.QSHELL} batchdelete --force {cfg.QN_BUCKET_NAME} -i {PATH_QN_LOG}')

# 生成site-pub文件夹
os.chdir(PATH_SITE)
os.system(f'{cfg.HUGO} -d {PATH_SITE_PUB}')

# 如果不存在七牛云错误页面文件errno-404，则创建它
e404 = PATH_SITE_PUB + '/errno-404'
if not os.path.isfile(e404):
    shutil.copy(PATH_SITE_PUB + '/404.html', e404)

# 上传site-pub到七牛
print('upload site-pub to qn...\n')
os.system('@echo off')
os.system('echo '' > ' + PATH_QN_LOG)
os.system(f'{cfg.QSHELL} qupload2 --src-dir={PATH_SITE_PUB} --bucket=akynazh-blog --skip-path-prefixes=.git --ignore-dir=false --overwrite=true --check-exists=true --check-hash=false --check-size=true --rescan-local=true --log-level=info --log-file={PATH_QN_LOG} --file-type=0 > {PATH_QN_RES}')
with open(PATH_QN_RES, 'r') as f:
    lines = f.readlines()
    s = 0
    len1 = len(lines)
    for line in lines:
        if line.find('Upload Result') != -1:
            break
        s += 1
    for i in range(s, len1):
        print(lines[i], end='')

# 上传site到github
print('upload site to github...')
os.system('git add . && git commit -m "update" && git push')