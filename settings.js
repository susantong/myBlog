var config = {
    blogName: '个人博客',
    //headPicture: '/images/bg.png',
    aPageNum: 7,//分页,一页显示多少文章.
    dbUser: 'root',//dbUser填写 '' 说明数据库和本博客在同一台机器
    dbPass: '1234',
    //dbAddress: '192.168.1.120',
    dbPort: '27017',
    dbName: 'test',
    ownerName: 'susan',//个人姓名，显示在博主信息中
    ownerLocation: '西安',//所在地，显示在博主信息中
    ownerOccupation: 'student',//职业，显示在博主信息中
    ownerSkill: 'web',//主要从事领域与技能，显示在博主信息中
    motto: 'Thoughts, stories and ideas.',//座右铭，显示在博主信息中
    email: '1316160497@qq.com',
    cookieSecret: 'microblogjay'
}
module.exports = config;