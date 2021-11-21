# mongoDB使用

## NoSQL 简介

### 关系型数据库遇到的问题

2008 年左右，网站 、 论坛、社交网络开始高速发展，传统的关系型数据库在存储及处理数据的时候受到了很大的挑战 ，其中主要体现在以下几点：

- 难以应付每秒上万次的高并发数据写入 。
- 查询上亿量级数据的速度极其缓慢 。
- 分库、分表形成的子库到达一定规模后难以进一步扩展 。
- 分库、分表 的规则可能会因为需求变更而发生变更。
- 修改表结构困难 。

在很多 互联网应用场景下 ， 对数据联表的查询需求不是那么强烈 ，也并不需要在数据写入后立刻读取，但对数据的读取和并发写入速度有非常高的要求 。 在这样的情况下 ，非关系型数据库得到高速的发展 。

### 什么是 NoSQL 数据库

如果你之前只接触过关系型数据库如 Oracle、Mysql 或 SQL Server，在学习 MongoDB 时可能会感到不安，突然有一款数据库不支持外键，不支持事务，不支持数据类型约定，会给人一种没法用的感觉。
MongoDB 就是这样一款非关系型的数据库，什么叫非关系型？就是把数据直接放进一个大仓库，不标号、不连线、单纯的堆起来。传统数据库由于受到各种关系的累赘，各种数据形式的束缚，难以处理海量数据以及超高并发的业务场景。
为了解决上述问题，必须有一款自废武功，以求在更高层次上突破瓶颈的数据库系统。就像张无忌忘记招式从而学习太极一样，摈弃了固有模式的 MongoDB 才能应对 Facebook 上亿比特的海量数据。
NoSQL(NoSQL = Not Only SQL )，意即"不仅仅是SQL"。
在现代的计算系统上每天网络上都会产生庞大的数据量，这些数据有很大一部分是由关系数据库管理系统（RDBMS）来处理。
1970年 E.F.Codd's提出的关系模型的论文 "A relational model of data for large shared data banks"，这使得数据建模和应用程序编程更加简单。
通过应用实践证明，关系模型是非常适合于客户服务器编程，远远超出预期的利益，今天它是结构化数据存储在网络和商务应用的主导技术。
NoSQL 是一项全新的数据库革命性运动，早期就有人提出，发展至2009年趋势越发高涨。NoSQL的拥护者们提倡运用非关系型的数据存储，相对于铺天盖地的关系型数据库运用，这一概念无疑是一种全新的思维的注入。

### NoSQL 数据库有哪些特点

- 可弹性扩展
- BASE 特性
- 大数据量、高性能
- 灵活的数据模型
- 高可用

### NoSQL 数据库有哪些种类

#### 键值数据库

这类数据库主要是使用数据结构中的键 Key 来查找特定的数据Value。

- 优点：在存储时不采用任何模式，因此极易添加数据

这类数据库具有极高的读写性能，用于处理大量数据的高访问负载比较合适。
键值对数据库适合大量数据的高访问及写入负载场景，例如日志系统。
主要代表是 Redis、Flare。

#### 文档型数据库

这类数据库满足了海量数据的存储和访问需求，同时对字段要求不严格，可以随意增加、删除、修改字段，且不需要预先定义表结构，所以适用于各种网络应用。
主要代表是 MongoDB、CouchDB。

#### 列存储型数据库

主要代表是 Cassandra 、Hbase。
这类数据库查找速度快，可扩展性强，适合用作分布式文件存储系统。

#### 图数据库

主要代表是 InfoGrid 、Neo4J 。
这类数据库利用“图结构”的相关算法来存储实体之间的关系信息，适合用于构建社交网络和推荐系统的关系图谱。

#### NoSQL 与 RDB 该怎么选择

既然 NoSQL 数据库有这么多的优势，那它是否可以直接取代关系型数据库？
NoSQL 并不能完全取代关系型数据库，NoSQL 主要被用来处理大量且多元数据的存储及运算问题。在这样的特性差异下，我们该如何选择合适的数据库以解决数据存储与处理问题呢？这里提供以下几点作为判断依据。

1、数据模型的关联性要求
NoSQL 适合模型关联性比较低的应用。因此：
- 如果需要多表关联，则更适合用 RDB
- 如果对象实体关联少，则更适合用 NoSQL 数据库
  * 其中 MongoDB 可以支持复杂度相对高的数据结构，能够将相关联的数据以文档的方式嵌入，从而减少数据之间的关联操作

2、数据库的性能要求
如果数据量多切访问速度至关重要，那么使用 NoSQL 数据库可能是比较合适的。NoSQL 数据库能通过数据的分布存储大幅地提供存储性能。

3、数据的一致性要求
NoSQL 数据库有一个缺点：其在事务处理与一致性方面无法与 RDB 相提并论。
因此，NoSQL 数据库很难同时满足强一致性与高并发性。如果应用对性能有高要求，则 NoSQL 数据库只能做到数据最终一致。

4、数据的可用性要求
考虑到数据不可用可能会造成风险，NoSQL 数据库提供了强大的数据可用性（在一些需要快速反馈信息给使用者的应用中，响应延迟也算某种程度的高可用）。

一个项目并非只选择一种数据库，可以将其拆开设计，将需要 RDB 特性的放到 RDB 中管理，而其它数据放到 NoSQL 中管理。

## MongoDB 简介

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211121103436282-671131316.png)

### 什么是 MongoDB

- 官方文档：https://www.mongodb.com/
- MongoDB 是由 C++ 语言编写的，是一个基于分布式文件存储的开源 NoSQL 数据库系统。
- MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。
  ○ 这会让曾经使用过关系型数据库的人比较容易上手
- MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211121103625023-607084340.png)

- MongoDB 的查询功能非常强大
  * 不仅支持大部分关系型数据库中的单表查询，还支持范围查询、排序、聚合、MapReduce 等
  * MongoDB 的查询语法类似于面相对象的程序语言

### MongoDB 有哪些特点

- 文档型数据库
- 高性能
- 灵活性
- 可扩展性
- 强大的查询语言
- 优异的性能
- 高性能：支持使用嵌入数据时，减少系统I/O负担，支持子文档查询
- 多种查询类型支持，且支持数据聚合查询、文本检索、地址位置查询
- 高可用、水平扩展：支持副本集与分片
- 多种存储引擎：WiredTiger , In-Memory

### MongoDB 发展历史

- 2007年10月，MongoDB 由 10gen 团队所发展
- 2009年2月首度推出 1.0 版
- 2011年9月，发布 2.0 版本
  ○ 分片、复制等功能
- 2015年3月，发布 3.0 版本
  ○ WiredTiger存储引擎支持
- 2018年6月，发布 4.0 版本
  ○ 推出ACID事务支持，成为第一个支持强事务的NoSQL数据库；
- ……

### MongoDB 适用于哪些场景

1、需要处理大量的低价值数据，且对数据处理性能有较高要求
比如，对微博数据的处理就不需要太高的事务性，但是对数据的存取性能有很高的要求，这时就非常适合使用 MongoDB。

2、需要借助缓存层来处理数据
因为 MongoDB 能高效的处理数据，所以非常适合作为缓存层来使用。将 MongoDB 作为持久化缓存层，可以避免底层存储的资源过载。

3、需要高度的伸缩性
对关系型数据库而言，当表的大小达到一定数量级后，其性能会急剧下降。这时可以使用多台 MongoDB 服务器搭建一个集群环境，实现最大程度的扩展，且不影响性能。

## 安装 MongoDB

> 建议参考官方文档中的安装教程：https://docs.mongodb.com/manual/installation/

- [在 Linux 中安装 MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)
  * 方式一：使用 Linux 发行版中的包管理器安装，例如 CentOS  Linux 中的 yum、Ubuntu 中的 apt
  * 方式二：下载安装包手动安装
- [在 macOS 中安装 MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  * 方式一：使用 Homebrew 包管理器安装管理 MongoDB 服务
  * 方式二：下载安装包手动安装
- [在 Windows 中安装 MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
  * 方式一：使用 .msi 安装程序快速安装
  * 方式二：下载安装包手动安装

从学习角度考虑建议下载安装包手动安装的方式来安装 MongoDB，这样我们可以知道更多的细节。在熟悉了以后可以使用更简单的方式。
下面我以在 Windows 系统上下载安装包手动安装的方式为例演示安装过程。

### 注意事项

- 关于 MongoDB 的版本号
  * MongoDB 版本形式为 X.Y.Z，例如 4.4.2
  * 如果 Y 是奇数（例如 4.3），则为开发版，建议开发测试使用
  * 如果 Y 是偶数（例如 4.4），则为稳定版，建议生产环境使用
- 从版本 3.2 之后不再支持 32 位操作系统
- 课程中使用到的版本是最新稳定版 4.4
  * Windows Server 2019
  * Windows 10 / Windows Server 2016
  * macOS 10.13 及更高版本
  * MongoDB 不支持 WSL（Windows Subsystem for Linux）

### 安装 MongoDB

> 这里以 Windows 手动安装 MongoDB 为例。

1、下载 MongoDB 安装包

- https://www.mongodb.com/try/download/community

2、解压压缩包，将解压出来的资源文件放到一个稳定的目录中

3、关于 MongoDB 软件包目录文件

| 文件名 | 说明 |
| -- | -- |
| mongod.exe | 服务端，用来启动数据库服务的 |
| mongo.exe | 客户端，用来连接数据库服务操作数据库 |

4、将 MongoDB 安装包中的 bin 目录配置到环境 PATH 变量
配置 PATH 环境变量的目的是为了能够在命令行中的任何位置都能够访问到 bin 目录中的可执行程序。

5、确认是否配置成功

```shell
mongod --version
```

> 注意：如果是配置环境变量之前打开的命令行，则需要在配置完环境变量之后将命令行重启才能生效。

### 启动和停止 MongoDB 数据库服务

```shell
mongod --dbpath="数据存储目录"
```

> mongod 默认监听 127.0.0.1:27017。

如果单独执行 mongod，它会默认使用执行 mongod 命令所处磁盘根目录/data/db 作为数据存储目录。

## mongo Shell

### 什么是 mongo Shell

- mongo Shell 是 MongoDB 官方提供的一个在命令行中用来连接操作 MongoDB 服务的客户端工具
- 使用 mongo Shell 可以对 MongoDB 数据库进行数据的管理

### 下载 mongo Shell

mongo Shell 包含在 MongoDB 服务器安装中。如果您已经安装了服务器，则 mongo Shell 将安装在与服务器二进制文件相同的位置。
另外，如果您想从 MongoDB 服务器上单独下载 mongo shell，可以参考这里：https://docs.mongodb.com/manual/mongo/#download-the-mongo-shell。

### 启动 mongo Shell 并连接到 MongoDB

#### 连接默认端口上的本地 MongoDB 服务

您可以在没有任何命令行选项的情况下运行 mongo shell，以使用默认端口 27017 连接到在本地主机上运行的 MongoDB 实例： 

```shell
mongo
```

#### 连接非默认端口上的本地 MongoDB 服务

要明确指定端口，请包括 --port 命令行选项。例如，要使用非默认端口 28015 连接到在 localhost 上运行的 MongoDB 实例，请执行以下操作：

```shell
mongo --port 28015
```

#### 连接远程主机上的 MongoDB 服务

连接远程主机上的 MongoDB 服务需要明确指定主机名和端口号。
您可以指定一个连接字符串。例如，要连接到在远程主机上运行的 MongoDB 实例，请执行以下操作： 

```shell
mongo "mongodb://mongodb0.example.com:28015"
```

您可以使用命令行选项 --host <主机>:<端口>。例如，要连接到在远程主机上运行的 MongoDB 实例，请执行以下操作： 

```shell
mongo --host mongodb0.example.com:28015
```

您可以使用--host <host>和--port <port>命令行选项。例如，要连接到在远程主机上运行的MongoDB实例，请执行以下操作： 

```shell
mongo --host mongodb0.example.com --port 28015
```

### 连接具有身份认证的 MongoDB 服务

您可以在连接字符串中指定用户名，身份验证数据库以及可选的密码。例如，以alice用户身份连接并认证到远程MongoDB实例：

```shell
mongo "mongodb://alice@mongodb0.examples.com:28015/?authSource=admin"
```

您可以使用--username <user>和--password，--authenticationDatabase <db>命令行选项。例如，以alice用户身份连接并认证到远程MongoDB实例：

```shell
mongo --username alice --password --authenticationDatabase admin --host mongodb0.examples.com --port 28015
```

> 注意：如果您指定--password而不输入用户密码，则外壳程序将提示您输入密码。

### mongo Shell 执行环境

- 提供了 JavaScript 执行环境
- 内置了一些数据库操作命令
  * show dbs
  * db
  * use database
  * show collections
  * ...
- 提供了一大堆的内置 API 用来操作数据库
  ○ db.users.insert({ name: 'Jack', age: 18 })

### 退出连接

三种方式：

- exit
- quit()
- Ctrl + C
