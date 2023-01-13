---
title: Hugo通过Algolia添加站内搜索功能
date: 2022-07-20T23:46:01+08:00
categories: [Tool]
tags: [hugo, site]
slug: hugo-adds-onsite-search-function-through-algolia
---

## 注册账号并创建Index

官网链接：[Algolia](https://www.algolia.com)，注册完成后保存好ApiID和ApiKey。

接着，创建一个Index，保存好Index的名称。

## 数据生成以及上传Algolia

### 方法一：通过hugo-algolia插件的方式

一、下载hugo-algolia： `npm install -g hugo-algolia`

二、编写config.yaml

网站根目录下创建config.yaml，编写参数如下：

```yaml
---
algolia:
    index: "{indexName}"
    key: "{key}"
    appID: "{appID}"
---
``` 

三、生成algolia.json

网站根目录下运行： `hugo-algolia -s`，即可生成 `{site}/public/algolia.json`，同时该数据也同步到了algolia账户下，可以去官网查看。

四、前往algolia的indices进行搜索类型的设置
    
可以选择按tag，category，content等内容进行搜索，并指定优先级。

### 方法二：通过GithubAction的方式

这里不通过插件而是通过hugo定制化地生成algolia.json，然后通过GithubAction在每次push时上传数据。

个人更推荐这样做，更好定制化且方便。同时上面方法一有个bug，对中文数据好像不支持。

#### 一、配置algolia输出文件
```yaml
outputs:
home:
    - HTML
    - RSS
    - Algolia
outputFormats:
Algolia:
    mediaType: application/json
    baseName: algolia
    isPlainText: true
```

#### 二、生成algolia.json

编辑 `{site}/themes/layouts/_default/list.algolia.json` 如下：

```json
[
    {{- range $index, $entry := .Site.RegularPages }}
    {{- if $index }}, {{ end }}
        {
        "objectID": "{{ .File.TranslationBaseName }}",
        "url": {{ .Permalink | jsonify }},
        "title": {{ .Title | jsonify }},
        "date": {{ .PublishDate | jsonify }},
        "tags": {{ .Params.tags | jsonify }},
        "categories": {{.Params.categories | jsonify}},
        "summary": {{ .Summary | jsonify }},
        "content": {{ .Plain | jsonify }}
        }
    {{- end }}
]
```

这里可以自行查阅文档定制化查询数据。

接着，在{site}下通过hugo命令即可在public下生成algolia.json文件。

#### 三、在GithubAction新建工作流：

```yaml
name: Algolia Upload Records
on:
[push] # 推送时执行
jobs:
algolia:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
        # 获取代码 Checkout
        uses: actions/checkout@v2
    - name: Upload Records
        # 使用 Action
        uses: iChochy/Algolia-Upload-Records@main
        # 设置环境变量
        env:
        APPLICATION_ID: ${{secrets.ALGOLIA_APPID}} # appID
        ADMIN_API_KEY: ${{secrets.ALGOLIA_KEY}} # key
        INDEX_NAME: ${{secrets.ALGOLIA_INDEX}} # index
        FILE_PATH: algolia.json
```
注意添加好对应环境变量。

之后，每次push都会自动将algolia.json推送到algolia数据库啦。

#### 四、关于搜索类型的设置

前往algolia的indices进行搜索类型的设置，可以选择按tag，category，content等内容进行搜索，并指定优先级。

## 定制搜索框

### 定制search.html

在`{site}/themes/{theme}/layouts/partials`下创建search.html：

```html
<div id="modalSearch" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <div class="aa-input-container" id="aa-input-container">
                    <input type="search" id="aa-search-input" class="aa-input-search" placeholder="write here..." name="search" autocomplete="off" />
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ "https://res.cloudinary.com/jimmysong/raw/upload/rootsongjc-hugo/algoliasearch.min.js" | absURL }}"></script>
<script src="{{ "https://res.cloudinary.com/jimmysong/raw/upload/rootsongjc-hugo/autocomplete.min.js" | absURL }}"></script>
<script>
var client = algoliasearch("{appID}", "{key}");
var index = client.initIndex('{indexName}');
autocomplete('#aa-search-input',
{ hint: false}, {
    source: autocomplete.sources.hits(index, {hitsPerPage: 8}),
    displayKey: 'name',
    templates: {
        suggestion: function(suggestion) {
            var des_url = suggestion.uri;
            var reg = /[《》（）]/g; // 转化一些中文字符，可以自己指定需要的
            des_url = des_url.toLowerCase().replace(reg, ""); // 转为小写
            return '<span>' + '<a href="' + des_url + '"">' +
            suggestion._highlightResult.title.value + '</a></span>';
        }
    }
});
</script>
```

其中注意代码片段：

```js
var client = algoliasearch("{appID}", "{key}");
var index = client.initIndex('{indexName}');
```

自己填入自己的appID，key，index名称即可。


### 在自己需要的地方放置搜索框

```
<!--搜索文章-->
{{ partial "search.html" . }}
```

---

**From My Blog: [akynazh](https://akynazh.site)**.

**Over.**