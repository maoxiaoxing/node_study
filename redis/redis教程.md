# Redis 教程

## Redis 简介

2008 年，意大利的一家创业公司 Merzia 推出了一款基于 MySQL 的网站实时统计系统 LLOOGG ，然而没过多久该公司的创始人 Salvatore Sanfilippo 便开始对 MySQL 的性能感到失望，于是他决定亲自为 LLOOGG 量身定做一个数据库，并于 2009 年开发完成，这个数据库就是 Redis。
不过 Salvatore Sanfilippo 并不满足只将 Redis 用于 LLOOGG 这一款产品，而是希望让更多的人使用它，于是在同一年 Salvatore Sanfilippo 将 Redis 开源发布，并开始和 Redis 的另一名主要的代码贡献者 Pieter Noordhuis 一起继续着 Redis  的开发，直到今天。
Salvatore Sanfilippo 自己也没有想到，短短的几年时间，Redis 就拥有了庞大的用户群体。国内如BAT、新浪微博、知乎等，国外如 GitHub、Stack Overflow、Flickr、暴雪和 Instagram 等，都是 Redis 的用户。
发展时间线：

- VMware 公司从 2010 年开始赞助 Redis 的开发，Salvatore Sanfilippo 和 Pieter Noordhuis 也分别于同年的 3 月和 5 月加入 VMware，全职开发 Redis
- 而 2013 年 5 月至 2015 年 6 月期间，其开发由 Pivotal 赞助
- 2015 年 6 月，Redis Labs 为进一步的开发进行赞助一直到现在

Redis 代码托管在 [GitHub](https://github.com/redis/redis) 上，开发十分活跃。

### 什么是 Redis

以下是官方文档的解释。
Redis 是一个使用 ANSI C 编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库。
Redis 不是简单的 Key-Value 数据库，它还支持数据结构，例如

- 字符串
- 哈希
- 列表
- 集合
- 带范围查询的排序集合
- 位图
- 超日志
- 带有半径查询和流的地理空间索引

Redis 具有内置的复制功能，解析执行 Lua 脚本，LRU 缓存控制，事务和不同级别的磁盘持久性，并通过 Redis Sentinel 和 Redis Cluster 自动分区提供高可用性。

### Redis 的存储结构

在大多数编程语言中都有一种数据结构：字典，例如代码 dict["key"] = "value" 中：

- dict 是一个字典结构变量
- key 是键名
- value 是键值

在字典中我们可以获取或设置键名对应的键值，也可以删除一个键。
Redis 是 REmote DIctionary Server（远程字典服务器）的缩写，它以字典结构存储数据，并允许其他应用通过 TCP 协议读写字典中的内容。
Redis 字典中的键值除了可以是字符串，还可以是其它数据类型。其中比较常见的有：

|  类型   | 说明  |
|  ----  | ----  |
| String  | 字符串 |
| Hash  | 散列，是由与值相关联的字段组成的内容。字段和值都是字符串。这与 Ruby 或 Python 哈希非常相似。
类似于 JavaScript 中的对象结构。 |
| List  | 列表，根据插入顺序排序的字符串元素的集合。它们基本上是链表。 |
| Set  | 未排序的字符串元素集合，集合中的数据是不重复的 |
| ZSet  | 与Sets类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排序，因此与 Sets 不同，可以检索一系列元素（例如，您可能会问：给我前10名或后10名） |

### 内存存储与持久化

Redis 数据库中所有数据都存储在内存中。相对于磁盘，内存的数据读/写速度要快得多，所以我们通常用 Redis 做缓存数据库，在一台普通电脑上，Redis 可以在一秒内读写超过 10 万个键值。

> Redis 官网的性能测试显示，在 Linux 2.6、Xeon X3320 2.5 GHz 服务器上，50 个并发的情况下请求 100000 次，SET 操作可达 110000 次/s，GET 操作可达 81000 次/s

将数据存储在内存中也有问题，比如程序退出后内存中的数据会丢失。不过 Redis 提供了对持久化的支持，即可以将内存中的数据异步写入到硬盘中，同时不影响继续提供服务。

### 功能丰富

Redis 虽然是作为数据库开发的，但是由于提供了丰富的功能，越来越多人将其用作缓存、队列系统等。
（1）作为缓存系统
Redis 可以为每个键设置生存时间，生存时间到期后会自动被删除。这一功能配合出色的性能让 Redis 可以作为缓存来使用。作为缓存系统，Redis 还可以限定数据占用的最大空间，在数据达到空间限制后可以按照一定的规则自动淘汰不需要的键。
（2）作为队列系统
除此之外，Redis 的列表类型键可以用来实现队列，并且支持阻塞式读取，可以很容易的实现一个高性能的优先级队列。
（3）“发布/订阅”功能
同时在更高层面上，Redis 还支持“发布/订阅”的消息模式，可以基于此构建聊天室等系统。

### 简单稳定

即使功能再丰富，如果使用起来太复杂也很难吸引人。Redis 直观的存储结构使得通过程序与 Redis 交互十分简单。

在 Redis 中使用命令来读写数据，命令语句之于 Redis 就相当于 SQL 语言之于关系数据库。例如在关系数据库中要获取 posts 表内 id 为 1 的记录的 title 字段可以使用如下 SQL 语句实现：

```sql
SELECT title FROM posts WHERE id=1 LIMIT 1
```

相对应的，在 Redis 中要读取键名为 post: 1 的散列类型键的 title 字段的值，可以使用如下语句实现：

```shell
HGET post:1 title
```

其中，HGET 就是一个命令，post:1 是键名，title 是要读取的数据字段。
Redis 提供了 250 多个命令，听起来很多，但是常用的也就几十个，并且每个命令都很容易记忆。

> Redis 命令列表：https://redis.io/commands

Redis 提供了几十种不同编程语言的客户端（https://redis.io/clients）， 这些库都很好的封装了 Redis 的命令，使得在程序中与 Redis 进行交互变得更容易。

### Redis 应用场景

Redis是一个 Key-Value 存储系统，大部分情况下是因为其高性能的特性，被当做缓存使用，这里介绍下Redis经常遇到的使用场景。
一个产品的使用场景肯定是需要根据产品的特性，先列举一下 Redis 的特点：

- 读写性能优异
- 持久化
- 数据类型丰富
- 单线程
- 数据自动过期
- 发布订阅
- 分布式

这里我们通过几个场景，不同维度说下 Redis 的应用。

（1）缓存系统
缓存现在几乎是所有中大型网站都在用的必杀技，合理的利用缓存不仅能够提升网站访问速度，还能大大降低数据库的压力。Redis 提供了键过期功能，也提供了灵活的键淘汰策略，所以，现在 Redis 用在缓存的场合非常多。
（2）排行榜
很多网站都有排行榜应用的，如京东的月度销量榜单、商品按时间的上新排行榜等。Redis提供的有序集合数据类构能实现各种复杂的排行榜应用。
（3）计数器
什么是计数器，如电商网站商品的浏览量、视频网站视频的播放数等。为了保证数据实时效，每次浏览都得给+1，并发量高时如果每次都请求数据库操作无疑是种挑战和压力。Redis提供的incr命令来实现计数器功能，内存操作，性能非常好，非常适用于这些计数场景。
（4）分布式会话
集群模式下，在应用不多的情况下一般使用容器自带的session复制功能就能满足，当应用增多相对复杂的系统中，一般都会搭建以Redis等内存数据库为中心的session服务，session不再由容器管理，而是由session服务及内存数据库管理。
（5）分布式锁
在很多互联网公司中都使用了分布式技术，分布式技术带来的技术挑战是对同一个资源的并发访问，如全局ID、减库存、秒杀等场景，并发量不大的场景可以使用数据库的悲观锁、乐观锁来实现，但在并发量高的场合中，利用数据库锁来控制资源的并发访问是不太理想的，大大影响了数据库的性能。可以利用Redis的setnx功能来编写分布式的锁，如果设置返回1说明获取锁成功，否则获取锁失败，实际应用中要考虑的细节要更多。
（6）社交网络
点赞、踩、关注/被关注、共同好友等是社交网站的基本功能，社交网站的访问量通常来说比较大，而且传统的关系数据库类型不适合存储这种类型的数据，Redis提供的哈希、集合等数据结构能很方便的的实现这些功能。
（7）最新列表
Redis列表结构，LPUSH可以在列表头部插入一个内容ID作为关键字，LTRIM可用来限制列表的数量，这样列表永远为N个ID，无需查询最新的列表，直接根据ID去到对应的内容页即可。
（8）消息系统
消息队列是大型网站必用中间件，如 ActiveMQ、RabbitMQ、Kafka 等流行的消息队列中间件，主要用于业务解耦、流量削峰及异步处理实时性低的业务。Redis 提供了发布/订阅及阻塞队列功能，能实现一个简单的消息队列系统。另外，这个不能和专业的消息中间件相比。
（9）示例：秒杀和 Redis 的结合
秒杀是现在互联网系统中常见的营销模式，作为开发者，其实最不愿意这样的活动，因为非技术人员无法理解到其中的技术难度，导致在资源协调上总是有些偏差。秒杀其实经常会出现的问题包括：

- 并发太高导致程序阻塞。
- 库存无法有效控制，出现超卖的情况。

其实解决这些问题基本就两个方案：

- 数据尽量缓存,阻断用户和数据库的直接交互。
- 通过锁来控制避免超卖现象。

现在说明一下，如果现在做一个秒杀，那么，Redis 应该如何结合进行使用?

- 提前预热数据，放入Redis
- 商品列表放入Redis List
- 商品的详情数据 Redis Hash 保存，设置过期时间
- 商品的库存数据Redis Sorted Set 保存
- 用户的地址信息 Redis Set 保存
- 订单产生扣库存通过 Redis 制造分布式锁，库存同步扣除
- 订单产生后发货的数据，产生 Redis List，通过消息队列处理
- 秒杀结束后，再把 Redis 数据和数据库进行同步

以上是一个简略的秒杀系统和 Redis 结合的方案，当然实际可能还会引入 HTTP 缓存，或者将消息对接用 MQ 代替等方案，也会出现业务遗漏的情况，这个只是希望能抛砖引玉。

### 相关资源

- 官网：https://redis.io/
- GitHub 仓库：https://github.com/redis/redis
- 交互式学习 Redis：https://try.redis.io/
- Redis 中文网（非官方）：http://www.redis.cn/
- Redis 命令参考：http://doc.redisfans.com/

## Redis 安装

### 关于 Redis 的版本

Redis 借鉴了 Linux 操作系统对于版本号的命名规则：

- 版本号第二位如果是奇数，则为非稳定版本（例如2.7、2.9、3.1）
- 如果是偶数，则为稳定版本（例如2.6、2.8、3.0、3.2）

当前奇数版本就是下一个稳定版本的开发版本，例如 2.9 版本是 3.0 版本的开发版本。所以我们在生产环境通常选取偶数版本的Redis，如果对于某些新的特性想提前了解和使用，可以选择最新的奇数版本。

### 获取 Redis 的方式

获取 Redis 的方式有很多种：

- 安装到自己电脑上
- 安装到虚拟机上
- 安装到远程服务器上
- 可以从 Docker Hub 获取 Redis 的 Docker 镜像
- ...

### 在 macOS 中安装 Redis

在 macOS 中有两种方式：
- 方式一：编译安装
- 方式二（推荐）：使用 Homebrew 安装

macOS 系统下的软件包管理工具 Homebrew 提供了较新版本的 Redis 包，所以我们可以直接使用它们来安装 Redis，省去了在 Linux 上需要手动编译的麻烦。

1、安装 [Homebrew](https://brew.sh/)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

2、通过 Homebrew 安装 Redis

```bash
brew install redis
```

### 在 Windows 中安装 Redis

Redis 官方不支持 Windows。2011 年微软向 Redis 提交了一个补丁，以使 Redis 可以在 Windows 下编译运行。但被作者拒绝了，原因是在服务器领域上 Linux 已经得到了广泛的使用，让 Redis 能在 Windows 下运行相比而言显得不那么重要。并且 Redis 使用了如写时复制等很多操作系统相关的特性，兼容 Windows 会耗费天大的精力而影响 Redis 的开发。
尽管如此微软还是发布了一个可以在 [Windows 下的 Redis 版本](https://github.com/microsoftarchive/redis)，但是这个项目已经不再维护。
如果你实在想要在 Windows 上学习使用 Redis 的话可以尝试一下 [Memurai](https://www.memurai.com/)，它是一个 Redis for Windows 的替代品，它的核心基于 Redis 源代码并且完全兼容 Redis，但是该项目并未得到微软官方的认可，有兴趣的话可以尝试一下。

### 在 Linux 中安装 Redis

```bash
# 下载 Redis 源码
wget https://download.redis.io/releases/redis-6.0.9.tar.gz

# 解压 Redis 压缩包
tar xzf redis-6.0.9.tar.gz

# 进入 Redis 源码目录
cd redis-6.0.9

# 编译安装
make
```

现在已编译的二进制文件位于 src 目录中。使用以下命令运行 Redis：

```shell
$ ./src/redis-server
```

要将 Redis 二进制文件安装到 /usr/local/bin 中，只需使用：

```shell
make install
```

### 运行 Redis

编译后在 Redis 源代码目录的 src 文件夹中会有以下几个可执行文件：

| 可执行文件 | 说明 |
| -- | -- |
| redis-server | Redis 服务器 |
| redis-cli | Redis 命令行客户端 |
| redis-benchmark | Redis 性能测试工具 |
| redis-check-aof | AOF 文件修复工具 |
| redis-check-dump | RDB 文件检查工具 |
| redis-sentinel | 哨兵模式工具 |

> 注意：通过编译源码安装的话，也会产生一个 redis.conf 的配置文件。

我们最常用是 redis-server 和 redis-cli。
最简单的，直接运行 redis-server 即可启动 Redis：

```shell
redis-server
```

Redis 默认使用 6379 端口，我们也可以通过 --port 参数指定启动端口：

```shell
redis-server --port 1234
```

如果需要在后台运行 Redis：

```shell
redis-server --daemonize yes
```

查看 Redis 运行状态：

```shell
# 查看 Redis 后端运行进程
ps -ef | grep -i redis
```

### 停止 Redis

考虑到 Redis 有可能正在将内存中的数据同步到硬盘中，强行终止 Redis 进程可能会导致数据丢失。
所有正确停止 Redis 的方式应该是向 Redis 发送 SHUTDOWN  命令：

```shell
redis-cli shutdown
```
当 Redis 手动 Shutdown 命令后，会先断开所有客户端连接，然后根据配置执行持久化，最后完成退出。
Redis 可以妥善处理 SIGTERM 信号，所有使用 kill Redis 进程的 PID 也可以正常结束 Redis，效果与发送 SHUTDOWN 命令一样。

```shell
# 通过进程号停止 Redis
kill -9 4684
```

### 连接 Redis

redis-cli 是 Redis 自带的基于命令行的 Redis 客户端，也是我们学习和测试 Redis 的重要工具。
运行 redis-cli 即可连接数据库：

```shell
redis-cli
```

也可以指定服务器地址和端口连接：

```shell
redis-cli -h 127.0.0.1 -p 1234
```

不出差错的话，此时已经连接上 Redis 数据库，我们通过 Redis 提供的 PING 命令来测试与 Redis 是否连接正常：

```shell
127.0.0.1:6379> PING
PONG
127.0.0.1:6379>
```

Redis 返回 PONG，证明连接正常。

如果想要断开连接：

- 命令：quit
- 快捷键：Ctrl + C

## Redis 配置

我们在之前介绍过可以通过 redis-server 的启动参数 port 设置了 Redis 服务的端口号，除此之外 Redis 还支持其他配置选项，如是否开启持久化、日志级别等。

### 通过命令行传递参数

最简单的方式就是在启动 redis-server 的时候直接传递命令参数。

```shell
redis-server --port 6380 --host 127.0.0.1
```

### 配置文件

由于可以配置的选项较多，通过启动参数设置这些选项并不方便，所以 Redis 支持通过配置文件来设置这些选项。
Redis 提供了一个配置文件的模板 redis.conf，位于源代码目录的根目录中。
我们建议把该文件放到 /etc/redis 目录中（该目录需要手动创建），以端口号命令，例如 6379.conf。
启用配置文件的方法是在启动时将配置文件的路径作为启动参数传递给 redis-server：

```shell
redis-server 配置文件路径
```

通过启动参数传递同名的配置选项会覆盖配置文件中的相应的参数，就像这样：

```shell
redis-server 配置文件路径 --port 3000
```

### 在服务器运行时更改 Redis 配置

还可以在 Redis 运行时通过 CONFIG SET 命令在不重新启动 Redis 的清空下动态修改部分 Redis 配置。就像这样：

```shell
CONFIG SET logLevel warning
```

同样在运行的时候也可以使用 CONFIG GET 命令获得 Redis 当前的配置情况：

```shell
CONFIG GET logLevel
```

## Redis 中的多数据库

一个 Redis 实例提供了多个用来存储数据的字典，客户端可以指定将数据存储在哪个字典中。这与我们熟知的在一个关系数据库中可以创建多个数据库类似，所有可以将其中的每个字典都理解成一个独立的数据库。
Redis 默认支持 16 个数据库，分别编号为 0、1、2、...14、15

- Redis 不支持自定义数据库名字
- 因为每个数据库都以编号命名，所有开发者必须要明确哪个数据库存放了哪些数据
- 可以通过配置参数 databases 修改支持的数据库个数

每个数据库都是独立的，也就是说你在 0 号数据库中插入的数据在 1 号数据库是访问不到的。
客户端与 Redis 建立连接后自动选择 0 号数据库，我们可以使用 SELECT 命令来更换数据库。

```shell
127.0.0.1:6379> SET a 1
OK
127.0.0.1:6379> KEYS *
1) "a"
127.0.0.1:6379> SELECT 16
(error) ERR DB index is out of range
127.0.0.1:6379> SELECT 15
OK
127.0.0.1:6379[15]> SET b 2
OK
127.0.0.1:6379[15]> KEYS *
1) "b"
127.0.0.1:6379[15]> SELECT 0
OK
127.0.0.1:6379> KEYS *
1) "a"
127.0.0.1:6379>

# 将指定 key 移动到指定数据库
move key db
```

> 当选择的数据库编号超过最大数据库编号时，默认编号的数据库

Redis 不支持为每个数据库设置不同的访问密码，所有一个客户端要么可以访问全部数据库，要么一个数据库也没有权限访问。
最重要的一点是多个数据库之间并不是完全隔离的，比如 FLUSHALL 命令可以清空一个 Redis 实例中所有数据库中的数据。
综上所述，这些数据库更像是一个命名空间，而不适宜存储不同应用程序的数据，比如<font color=red>不适宜使用 0 号数据库存储 A 应用数据而使用 1 号数据库存储 B 应用数据，这是非常不推荐的做法！！！</font>
不同的应用应该使用不同的 Redis 实例存储数据。由于 Redis 非常轻量级，一个空的 Redis 占用的内存只有 1 MB 作用，所以不用担心多个 Redis 实例会额外占用很多内存的问题。

## Redis 常用数据类型及操作命令（CRUD）

Redis 不是简单的键值存储，它实际上是一个数据结构服务器，支持不同类型的值。这意味着在传统键值存储中，您将字符串键与字符串值相关联，而在 Redis 中，该值不仅限于简单的字符串，还可以容纳更复杂的数据结构。以下是 Redis 中支持的所有数据结构的列表：

| 类型 | 说明 |
| -- | -- |
| String | 字符串 |
| Hash | 散列，是由与值相关联的字段组成的内容。字段和值都是字符串。这与 Ruby 或 Python 哈希非常相似。
类似于 JavaScript 中的对象结构。 |
| List | List	列表，根据插入顺序排序的字符串元素的集合。它们基本上是链表。 |
| Set | 未排序的字符串元素集合，集合中的数据是不重复的。 |
| ZSet | 与 Sets 类似，但每个字符串元素都与一个称为分数的浮点值相关联。元素总是按它们的分数排序，因此与 Sets 不同，可以检索一系列元素（例如，您可能会问：给我前10名或后10名）。 |
| Bit arrays（或 bitmaps） | 可以使用特殊命令像位数组一样处理字符串值：您可以设置和清除单个位，计数所有设置为1的位，找到第一个设置或未设置的位，依此类推。 |
| HyperLogLogs | 这是一个概率数据结构，用于估计集合的基数。 |
| Streams | 提供抽象日志数据类型的类似地图项的仅追加集合。 |

### Redis 中的键

Redis 密钥是二进制安全的，这意味着您可以使用任何二进制序列作为 key，从 "foo" 之类的字符串到 JPEG 文件的内容。空字符串也是有效的键。
有关键的其他一些规则：

- 太长不好，占用内存空间
- 太短也不好，没有可读性
- 尝试坚持使用固定规则，例如：
  * object-type:id
  * user:1000
  * 点或破折号通常用于多字字段，例如：comment:1234:reply.to 或 comment:1234:reply-to 中。
- 允许的最大大小为 512 MB

总结一下：
- 不要太长，浪费空间
- 不要过短，不利于阅读
- 统一的命令规范

### 字符串（String）

字符串类型是 Redis 中最基本的数据类型，也是其它数据类型的基础。

- 它能存储任何形式的字符串，包括二进制数据。
- 你可以用它存储用户的邮箱、JSON 化的对象，甚至是一张图片
- value 最多可以容纳数据大小为 512 MB

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211120182410484-710162528.png)

字符串类型是其他常见 4 种数据类型的基础，其他数据类型和字符串类型的差别从某种角度来说只是组织字符的形式不同。
例如，列表类型是以列表的形式组织字符串，而集合类型是以集合的形式组织字符串。学习完后面的数据类型之后相信你会有更深的理解。

#### 添加

```shell
# 设置指定 key 的值
SET key value

# 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
GETSET key value

# 只有在 key 不存在时设置 key 的值
SETNX key value

# 同时设置一个或多个 key-value 对
MSET key value [key value ...]

# 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在
MSETNX key value [key value ...]

# 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
APPEND key value
```

> 注意：在 Redis 中命令不区分大小写。也就是说 SET foo bar 和 set foo bar 是一样的，但是我们约定使用大写表示它是一个 Redis 命令。

#### 查询

```shell
# 获取指定 key 的值
GET key

# 返回 key 中字符串值的子字符
GETRANGE key start end

# 获取所有(一个或多个)给定 key 的值
MGET key [key ...]

# 返回 key 所储存的字符串值的长度。
STRLEN key

# 通用命令：查询集合中是否有指定的 key
EXISTS key [key ...]

# 通用命令，查询 key 的类型
TYPE key
```

#### 修改

```shell
# 设置指定 key 的值
SET key value

# 将给定 key 的值设为 value ，并返回 key 的旧值(old value)
GETSET key value

# 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾。
APPEND key value
```

#### 删除

```shell
# 通用命令：删除1个或多个指定的 key
DEL key [key ...]
```

#### 数字值

> 数字值在 Redis 中以字符串保存。

```shell
# 将 key 中储存的数字值增一
INCR key

# 将 key 所储存的值加上给定的增量值（increment） 
INCRBY key increment

# 将 key 中储存的数字值减一
DECR key

# key 所储存的值减去给定的减量值（decrement）
DECRBY key decrement
```

### 哈希（Hash）

哈希（也叫散列）类型也是一种字典结构，其存储了字段和字段值的映射，但字符值只能是字符串，不能其它数据类型，换句话说，散列类型不能嵌套其它数据类型。一个哈希类型可以包含至少 232 - 1 个字段。

> 提示：除了散列类型，Redis 的其它数据类型同样不支持数据类型嵌套。

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211120183114655-517421875.png)

#### 添加

```shell
# 将哈希表 key 中的字段 field 的值设为 value
HSET key field value [field value ...]

# 同时将多个 field-value (域-值)对设置到哈希表 key 中
HMSET key field value [field value ...]

# 只有在字段 field 不存在时，设置哈希表字段的值
HSETNX key field value
```

#### 查询

```shell
# 获取所有哈希表中的字段
HKEYS key

# 获取哈希表中字段的数量
HLEN key

# 获取所有给定字段的值
HMGET key field1 [field2]

# 获取存储在哈希表中指定字段的值
HGET key field

# 获取在哈希表中指定 key 的所有字段和值
HGETALL key

# 查看哈希表 key 中，指定的字段是否存在
HEXISTS key field

# 获取哈希表中所有值
HVALS key

# 迭代哈希表中的键值对
HSCAN key cursor [MATCH pattern] [COUNT count]
```

#### 修改

```shell
# 将哈希表 key 中的字段 field 的值设为 value
HSET key field value [field value ...]

# 为哈希表 key 中的指定字段的整数值加上增量 increment
HINCRBY key field increment
```

### 列表（List）

列表类型类似于编程语言中的数组，可以存储一个有序的字符串列表，常用的操作就是向列表两端添加元素，或者获得列表的某一个片段。

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211120183253014-1750008642.png)

列表类型内部使用双向链表实现的，所有向列表两端添加元素的时间复杂度为O(1)，获取越接近两端的元素速度就越快。这意味着即时是一个有几千万个元素的列表，获取头部或尾部的10条记录也是极快的（和从只有20个元素的列表中获取头部或尾部的10条记录的速度是一样的）。
不过使用链表的代价是通过索引访问元素比较慢。设想在 iPhone 发售当前有 1000 个人在商店排队购买，这时商家为了感谢大家的支持，决定奖励第486位的顾客异步免费的 iPhone。为了找到这第 486 位顾客，工作人员不得不从队首一个一个地数到 486 个人。但同时，无论队伍有多长，新来的人想加入队伍的话直接排到队尾就好了，和队伍里有多少人没有任何关系。这种情景与列表类型的特性很相似。
这种特性使列表类型能非常快速地完成关系数据库难以应付的场景：例如社交网站的新鲜事，我们关心的只是最新内容，使用列表类型存储，即使新鲜事的总数达到几千万个，获取其中最新的100条数据也是极快的。同样因为在两端插入记录的时间复杂度是O(1)，列表类型也适合用来记录日志，可以保证加入新日志的速度不会受到已有日志数量额影响。
一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。

#### 添加

```shell
# 将一个或多个值插入到列表头部
LPUSH key element [element ...]

# 在列表的元素前或者后插入元素
LINSERT key BEFORE|AFTER pivot value

# 将一个值插入到已存在的列表头部
LPUSHX key value

# 通过索引设置列表元素的值
LSET key index value

# 在列表中添加一个或多个值
RPUSH key value1 [value2]

# 为已存在的列表添加值
RPUSHX key value
```

#### 查询

```shell
# 通过索引获取列表中的元素
LINDEX key index

# 获取列表长度
LLEN key

# 获取列表指定范围内的元素
LRANGE key start stop
```

#### 删除

```shell
# 移出并获取列表的第一个元素
LPOP key

# 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BLPOP key1 [key2 ] timeout

# 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BRPOP key1 [key2 ] timeout

# 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止
BRPOPLPUSH source destination timeout

# 移除列表元素
# 如果 count > 0，则从头向尾遍历删除元素
# 如果 count < 0，则从后面向前面删除元素
# 如果 count = 0，则删除所有匹配的元素
LREM key count value

# 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区间之内的元素都将被删除
LTRIM key start stop

# 移除列表的最后一个元素，返回值为移除的元素
RPOP key

# 移除列表的最后一个元素，并将该元素添加到另一个列表并返回
RPOPLPUSH source destination
```

### 集合（Set）

集合类型和数学中的集合概念相似，集合中的元素是唯一的、无序的，简单理解集合就是没有顺序且不重复的列表。
一个集合类型可以存储至多 232 - 1 个字符串。
集合类型和列表类型有相似之处，它们的主要区别是：

- 列表是有序的，集合是无序的
- 列表数据可以重复，集合中没有重复数据

集合类型的常用操作是向集合中加入或删除元素、判断某个元素是否存在等。由于集合类型在 Redis 内部是使用值为空的散列表实现的，所以这些操作的时间复杂度都是O(1)。
最方便的是多个集合之间还可以进行并集、交集和差集运算。

#### 添加

```shell
# 向集合添加一个或多个成员
SADD key member1 [member2]
```

#### 查询

```shell
# 返回集合中的所有成员
SMEMBERS key

# 获取集合的成员数
SCARD key

# 判断 member 元素是否是集合 key 的成员
SISMEMBER key member

# 返回集合中一个或多个随机数
SRANDMEMBER key [count]
```

#### 删除

```shell
# 移除集合中一个或多个成员
SREM key member1 [member2]

# 移除并返回集合中的一个随机元素
SPOP key

# 将 member 元素从 source 集合移动到 destination 集合
SMOVE source destination member
```

#### 集合间聚合运算

多个集合之间还可以进行并集、交集和差集运算。

```shell
# 返回第一个集合与其他集合之间的差异。
SDIFF key1 [key2]

# 返回给定所有集合的交集
SINTER key1 [key2]

# 返回所有给定集合的并集
SUNION key1 [key2]

# 返回给定所有集合的差集并存储在 destination 中
SDIFFSTORE destination key1 [key2]

# 返回给定所有集合的交集并存储在 destination 中
SINTERSTORE destination key1 [key2]

# 所有给定集合的并集存储在 destination 集合中
SUNIONSTORE destination key1 [key2]
```

#### 使用场景

- 跟踪一些唯一性数据
  * 比如访问网站的唯一 IP 地址信息，每次访问网站的时候记录用户 IP 地址，SET 自动保证数据的唯一不重复
- 充分利用 SET 聚合操作方便高效的特性，用于维护数据对象之间的关联关系
  * 比如所有购买A商品的客户 ID 存储到指定的 SET 中，所有购买B商品的客户 ID 存储到指定的 SET 中，如果我们想要获取有哪个客户同时购买了这两个商品，我们只需要使用交集操作就可以轻松的查出来

### 有序集合（Sorted Set）

有序集合是一种类似于集合和哈希之间的混合数据类型。
- 与集合一样，排序集合由唯一的非重复字符串元素组成
- 有序集合中的元素不排序，但有序集合中的每个元素都关联了一个分数（这就是为什么类型也类似于哈希，因为每个元素都映射到一个值）
- 虽然集合中每个元素都是不同的，但是它们的分数确可以相同

![](https://img2020.cnblogs.com/blog/1575596/202111/1575596-20211120185956150-1169547325.png)

> 每个元素都会关联一个 double 类型的分数。Redis 正是通过分数来为集合中的成员进行从小到大的排序。

有序集合类型在某些方面和列表类型有些相似。
相同点：

- 两者都是有序的
- 两者都可以获得某一范围的元素

不同点：

- 列表类型通过链表实现的，获取靠近两端的数据速度极快，而当元素增多后，访问中间数据的速度会较慢，所以它更适合实现如“新鲜事”或“日志”这样很少访问中间元素的应用
- 有序集合类似是使用哈希表实现的，所以即使读取位于中间部分的数据速度也很快
- 列表中不能简单的调整某个元素的位置，但是有序集合可以（通过更改元素的分数）
- 有序集合要比列表类型更耗费内存

有序集合的典型应用场景：

（1）排行榜
例如一个大型在线游戏的积分排行榜，每当玩家的分数发生变化时，可以执行 ZADD 命令更新玩家的分数，此后再通过 ZRANGE 命令获取积分 TOPTEN 的用户信息。当然我们也可以利用 ZRANK 命令通过 username 来获取玩家的排行信息。最后我们将组合使用 ZRANGE 和 ZRANK 命令快速的获取和某个玩家积分相近的其他用户的信息。

（2）微博热搜
假设我们现在要获取热门的帖子或搜索，比如我们常用的微博热搜。
首先，我们需要一个衡量的标准，定量的量度热搜的热门程度。假设我们有一个字段叫回复量，回复量越高就越热门。
如果我们用关系型数据库来获取的话，用 SQL 语句实现很简单：

```shell
SELECT * FROM message ORDER BY backsum LIMIT 10
```

但是当数据量很大的时候，效率很低，同时如果建立索引又要消耗大量的资源，同时增加负载。
使用 Redis 的时候，我们不需要存储多余的信息，只需要存储帖子 id 和回复量两个信息就可以了。

#### 添加

```shell
# 向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZADD key score member [score member ...]
```

#### 查询

```shell
# 通过索引区间返回有序集合指定区间内的成员，分数从低到高排序
ZRANGE key start stop [WITHSCORES]

# 通过索引区间返回有序集合指定区间内的成员，分数从高到低排序
ZREVRANGE key start stop [WITHSCORES]

# 返回有序集中指定分数区间内的成员，分数从低到高排序
ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]

# 返回有序集中指定分数区间内的成员，分数从高到低排序
ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]

# 返回有序集合中指定成员的排名，有序集成员按分数值（从小到大）排序
ZRANK key member

# 返回有序集合中指定成员的排名，有序集成员按分数值（从大到小）排序
ZREVRANK key member

# 获取有序集合的成员数
ZCARD key

# 返回有序集中，成员的分数值
ZSCORE key member

# 计算在有序集合中指定区间分数的成员数
ZCOUNT key min max
```

#### 修改

```shell
# 向有序集合添加一个或多个成员，或者更新已存在成员的分数
ZADD key score member [score member ...]

# 有序集合中对指定成员的分数加上增量 increment
ZINCRBY key increment member
```

#### 删除

```shell
# 移除有序集合中的一个或多个成员
ZREM key member [member ...]

# 移除有序集合中给定的排名区间的所有成员
ZREMRANGEBYRANK key start stop

# 移除有序集合中给定的分数区间的所有成员
ZREMRANGEBYSCORE key min max
```

#### 有序集合间聚合运算

```shell
# 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中
ZINTERSTORE destination numkeys key [key ...]

# 计算给定的一个或多个有序集的并集，并存储在新的 key 中
ZUNIONSTORE destination numkeys key [key ...]
```

#### 通用命令

```shell
# 返回所有 key
KEYS *

# 返回所有以 my 开头的 key
KEYS my*

# 获取 key 的类型
TYPE key

# 查询某个 key 是否存在
EXISTS key [key ...]

# 将 key 改名为 newkey
RENAME key newkey

# 删除指定 key
DEL key [key ...]

# 从当前数据库中随机返回(不删除)一个 key
RANDOMKEY

# 对 key 进行重命名
RENAME key newkey

# 清空当前数据库所有内容
FLUSHDB

# 清空所有数据库内容
FLUSHALL

# 将当前数据库的 key 移动到给定的数据库 db 当中
MOVE key db
```

## Redis 过期时间

在实际开发中经常会遇到一些有时效的数据，比如限时优惠活动、缓存或验证码等，过了一定时间就需要删除这些数据。在关系数据库中一般需要额外的一个字段记录到期时间，然后定期检测删除过期数据。而在 Redis 中可以设置一个键的过期时间，到时间后 Redis 会自动删除它。

### 设置键的过期时间

```shell
# 为给定 key 设置生存时间，当 key 过期时(生存时间为 0 )，它会被自动删除。
EXPIRE key seconds

# 和 EXPIRE 一样，但是它以毫秒为单位
PEXPIRE key milliseconds

# EXPIREAT 的作用和 EXPIRE 类似，都用于为 key 设置生存时间。
# 不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。
EXPIREAT key timestamp

# 这个命令和 EXPIREAT 命令类似，但它以毫秒为单位设置 key 的过期 unix 时间戳，而不是像 EXPIREAT 那样，以秒为单位。
PEXPIREAT key milliseconds-timestamp
```

上面这4个命令只是单位和表现形式上的不同，但实际上 EXPIRE、PEXPIRE 以及 EXPIREAT 命令的执行最后都会使用 PEXPIREAT 来实行。
比如使用 EXPIRE 来设置 KEY 的生存时间为 N 秒，那么后台是如何运行的呢：

- 它会调用 PEXPIRE 命令把 N 秒转换为M毫秒
- 然后获取当前的 UNIX 时间单位也是毫秒
- 把当前 UNIX 时间加上 M 毫秒传递给 PEXPREAT

另外给键设置了过期时间，这个时间保存在一个字典里，也是键值结构，键是一个指针，指向真实的键，而值这是一个长整型的 UNIX 时间。

### 获取键的过期时间

```shell
# 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
TTL key

# 类似于 TTL，但它以毫秒为单位返回 key 的剩余生存时间。
PTTL key
```

过期时间返回值说明：

| 值 | 说明 |
| -- | -- |
| -2 | 过期且已删除 |
| -1 | 没有过期时间设置，即永不过期 |
| >0 | 表示距离过期还有多少秒或者毫秒 |

### 清除键的过期时间

```shell
# 移除给定 key 的生存时间，将这个 key 从『易失的』(带生存时间 key )转换成『持久的』(一个不带生存时间、永不过期的 key )。
PERSIST key
```

> 注意：
- 使用 SET 或 GETSET 命令为键赋值也会同时清除键的过期时间。
- 其它只对键值进行操作的命令（如 INCR、LPUSH、HSET、ZREM）不会影响键的过期时间。






