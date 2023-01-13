from time import strftime, localtime
import os
import cfg
import util_slug

PATH_DRAFT = f'{cfg.PATH_SITE}/drafts'

# 选择文章分类
names = os.listdir(f'{cfg.PATH_SITE}/content/posts')
filenames = []
for name in names:
    filenames.append(os.path.splitext(name)[0])
print('请选择文章分类：')
for i in range(len(filenames)):
    print(f'{i}: {filenames[i]}')
cp = int(input())
category = filenames[cp].capitalize()

# 输入文章标题
title = input('请输入文章标题：')
slug = util_slug.get_slug(title)

# 新建文章文件，写入必要内容
file_parent_dir = f'{PATH_DRAFT}/{slug}'
file_path = f'{file_parent_dir}/index.md'
os.makedirs(file_parent_dir)
with open(file_path, 'w') as f:
    f.write('---\n')
    f.write(f'title: {title}\n')
    f.write(f'date: {strftime("%Y-%m-%dT%H:%M:%S+08:00", localtime())}\n')
    f.write(f'categories: [{category}]\n')
    f.write('tags: []\n')
    f.write(f'slug: {slug}\n')
    f.write('---\n')
    f.write('\n')
    f.write('\n')
    f.write('---')
    f.write('\n')
    f.write('\n')
    f.write('**From my blog: [akynazh](https://akynazh.site)**.\n')
    f.write('\n**Over.**')

# 开始编辑
os.system(f'code {file_path}')