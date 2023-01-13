import cfg
import os

# get site path
PATH_SITE = cfg.PATH_SITE
PORT = cfg.PORT
SHARE_URL = cfg.SHARE_URL

os.chdir(PATH_SITE)
ch = input('局域网共享与否？共享输入1，输入其它不共享：')

if ch == '1':
    print(f'部署地址为 http://{SHARE_URL}:{PORT}')
    os.system(f'{cfg.HUGO} server --port={PORT} --baseUrl={SHARE_URL} --bind=0.0.0.0')
else:
    print(f'部署地址为 http://localhost:{PORT}')
    os.system(f'{cfg.HUGO} server --port={PORT}')