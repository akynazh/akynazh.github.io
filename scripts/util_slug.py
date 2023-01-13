import hashlib
import requests
import random
import string
import cfg

def get_slug(title):
    # 进行百度翻译，再转出slug
    app_id = cfg.BAIDU_APP_ID
    app_key = cfg.BAIDU_APP_KEY
    req_url = cfg.BAIDU_REQ_URL
    from_lang = 'auto'       # 原文语种
    to_lang = 'en'           # 译文语种
    salt = random.randint(32768, 65536)
    sign = app_id + title + str(salt) + app_key
    sign = hashlib.md5(sign.encode()).hexdigest()
    resp = requests.get(req_url, params={
        'appid': app_id,
        'q': title,
        'from': from_lang,
        'to': to_lang,
        'salt': salt,
        'sign': sign
    })
    if resp.status_code == 200:
        slug = resp.json()['trans_result'][0]['dst'] # 取出结果
        for c in string.punctuation: # 去除英文标点
            slug = slug.replace(c,'')
        return slug.lower().strip().replace(' ', '-')
    return ''
            
if __name__ == '__main__':
    # 手动录入翻译内容，q存放
    title = input('请输入文章标题：')
    print(get_slug(title))