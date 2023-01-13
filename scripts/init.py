import os

try:
    import cfg
    # 创建文件夹
    PATH_DIR_HUGO = f'{cfg.PATH_SITE}/lib/hugo'
    PATH_DIR_QSHELL = f'{cfg.PATH_SITE}/lib/qshell'
    os.makedirs(PATH_DIR_HUGO)
    os.makedirs(PATH_DIR_QSHELL)
    # 下载hugo
    os.system(f'wget {cfg.HUGO_URL} -O {PATH_DIR_HUGO}/hugo.zip')
    os.chdir(PATH_DIR_HUGO)
    os.system('tar -zxvf hugo.zip')
    # 下载qshell
    os.system(f'wget {cfg.QSHELL_URL} -O {PATH_DIR_QSHELL}/qshell.zip')
    os.chdir(PATH_DIR_QSHELL)
    os.system('tar -zxvf qshell.zip')
    # 登录qn
    os.system(f'qshell account {cfg.QN_ACCESS_KEY} {cfg.QN_SECRET_KEY} {cfg.QN_ACCOUNT_NAME}')
except Exception as e:
    print(e)