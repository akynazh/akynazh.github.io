import ruamel.yaml
import cfg

yaml = ruamel.yaml.YAML()
yamlPath = cfg.PATH_SITE + '/config.yaml'
colorthemes = ['dark', 'white', 'eye']
c = 0
for colortheme in colorthemes:
    print(f'{c}-->{colortheme}')
    c += 1
print('Choose a theme please --> ')
ch = int(input())
colortheme = colorthemes[ch]
# 修改配置
with open(yamlPath, 'r',) as f:
    x = yaml.load(f.read())
    x['params']['colortheme'] = colortheme
    if colortheme == 'dark':
        x['markup']['highlight']['style'] = 'dracula'
        x['params']['comments']['utterances']['theme'] = 'github-dark'
    elif colortheme == 'white':
        x['markup']['highlight']['style'] = 'emacs'
        x['params']['comments']['utterances']['theme'] = 'github-light'
    elif colortheme == 'eye':
        x['markup']['highlight']['style'] = 'paraiso-light'
        x['params']['comments']['utterances']['theme'] = 'github-light'
    with open(yamlPath, 'w') as w_f:
        # 覆盖原先的配置文件
        yaml.dump(x, w_f)
