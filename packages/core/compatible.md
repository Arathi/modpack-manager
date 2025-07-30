# 模组接口兼容

```typescript
type ID = number | string;
```

## 源

```typescript
enum Source {
  CurseForge,
  Modrinth,
}
```

## 排序规则

| @amcs/core | CurseForge | Modrinth |
| --- | --- | --- |
| 关联性 | Relevancy (?) | Relevance (relevance) |
| 流行度 | Popularity (2) | Followers (follows) |
| 更新时间 | Latest update (3) | Date updated (updated) |
| 创建时间 | Creation Date (?) | Date published (newest) |
| 下载次数 | Total Downloads (6) | Downloads (downloads) |
| | A-Z|  |

备注：

* Modrinth没有根据名称排序的选项，也没有正序倒序

## 分类

| @amcs/core | 类型 | CurseForge | 类型 | Modrinth | 类型 |
| --- | --- | --- | --- | --- | --- |
| id | ID | id | number | id | string |
| slug | string | slug | string | id | string |
| name | string | name | string | - | |
| icon | string | iconUrl | url | icon | svg |

备注：

* Modrinth的分类目前有19个，`name` 自行创建映射表

## 模组

| @amcs/core | 类型 | CurseForge | 类型 | Modrinth | 类型 |
| --- | --- | --- | --- | --- | --- |
| id | ID | id | number | id | string |

## 文件

| @amcs/core | 类型 | CurseForge | 类型 | Modrinth | 类型 |
| --- | --- | --- | --- | --- | --- |
| id | ID | id | number | id | string |
| modId | ID | modId | number | project_id | string
| | | displayName | string | |
| fileName | string | fileName | string | files[0].filename | string |
| sha1 | string | hashes | object | files[0].hashes | object |
| publishedAt | timestamp | fileDate | iso8601 | date_published | iso8601 |
|  |  | fileLength | number | 
| downloads | number | downloadCount | number | downloads | number |
| fileSize | number | fileSizeOnDisk | number | files[0].size | number |
| url | string | downloadUrl | url | files[0].url | url |
| gameVersions | string[] | gameVersions | string[] | game_versions | string[] |
| modLoaders | ModLoader[] | gameVersions | string[] | loaders | string[] |
| dependencies | Dependency[] | dependencies | object[] | dependencies | object[] |
