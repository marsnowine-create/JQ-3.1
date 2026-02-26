import React from 'react';
import { AgentProfile, HeroCardData, ServiceCategory } from '../types';

export const SCENIC_NAME = "云峰屯堡";
export const WEATHER_INFO = {
  day: "周三",
  temp: "19°C",
  date: "12/10",
  condition: "Sunny"
};

// Image Assets - Updated with specific user provided URLs
const IMG_GUIDE = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104535.webp';
const IMG_STORY = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/084557.webp';

const IMG_EVENT = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104536_1.webp';
const IMG_PHOTO = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/084556.webp';
const IMG_LOCAL = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104535_1.webp';

const IMG_SERVICE = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/104536.webp';
const IMG_NEW_MAIN = 'https://img.lenyiin.com/app/thumb.php?img=/image/2026/02/14/091911.webp';

const IMG_ALL_AROUND = 'https://img.lenyiin.com/app/hide.php?key=K09NNWwrVE1WcDFqT3lkS29hNTFEeFkrd0dscXVUbm5rNmxGb3NRPQ==';

export const IMG_SCENIC_MAP_OUTSIDE = 'https://img.lenyiin.com/app/hide.php?key=bFJTWDY2bCtXNGk4K21HQ2dyWXJiaFkrd0dscXVUbm5rNmxGb3NRPQ=='; // Placeholder for map
export const IMG_SCENIC_REAL_INSIDE = 'https://img.lenyiin.com/app/hide.php?key=TnlMZFdQekF5WWRDaXhTYnB6UmxxUlkrd0dscXVUbm5rNmxGb3NRPQ==';

// Keep MAIN_AVATAR as the original (Storyteller/Moyuan) image as requested
export const MAIN_AVATAR = IMG_NEW_MAIN; 

// 1. All-around Assistant (全能助手)
// 2. Guide (引路人)
// 3. Storyteller (说书人)
// 4. Event Assistant (活动助手)
// 5. Service Assistant (服务助手)
// 6. Photo Assistant (旅拍助手)
// 7. Local Explorer (周边玩家)

export const AGENTS: AgentProfile[] = [
  {
    id: 'all_around',
    name: '全能助手',
    role: 'All-around Assistant',
    type: 'guide',
    avatarUrl: IMG_ALL_AROUND,
    description: '景区全能向导',
    defaultPrompt: '你好，我是全能助手，有什么可以帮您？'
  },
  {
    id: 'guide',
    name: '路线引导',
    role: 'Guide',
    type: 'guide',
    avatarUrl: IMG_GUIDE,
    description: '景区路线规划',
    defaultPrompt: '我在大门，请带我去最近的景点。'
  },
  {
    id: 'story',
    name: '文化讲解',
    role: 'Storyteller',
    type: 'culture',
    avatarUrl: IMG_STORY,
    description: '历史文化讲解',
    defaultPrompt: '给我讲讲这里发生的历史故事吧。'
  },
  {
    id: 'event',
    name: '活动助手',
    role: 'Event Assistant',
    type: 'planning',
    avatarUrl: IMG_EVENT,
    description: '演出活动资讯',
    defaultPrompt: '今天有哪些表演可以看？'
  },
  {
    id: 'service',
    name: '找设施',
    role: 'Service Assistant',
    type: 'guide',
    avatarUrl: IMG_SERVICE,
    description: '便民设施指引',
    defaultPrompt: '请问最近的洗手间在哪里？'
  },
  {
    id: 'photo',
    name: '旅拍助手',
    role: 'Photo Assistant',
    type: 'local',
    avatarUrl: IMG_PHOTO,
    description: '最佳打卡点',
    defaultPrompt: '推荐几个适合拍照好看的地方。'
  },
  {
    id: 'local',
    name: '周边玩家',
    role: 'Local Explorer',
    type: 'local',
    avatarUrl: IMG_LOCAL,
    description: '吃喝玩乐推荐',
    defaultPrompt: '周边有什么好吃的特色菜？'
  }
];

export const HERO_CARDS: HeroCardData[] = [
  {
    id: 'booking',
    name: '票务服务',
    tagline: '快速入园',
    avatarUrl: IMG_GUIDE, // Reusing Guide avatar for official feel
    cardImageUrl: 'https://picsum.photos/seed/booking/600/400',
    actions: [
      { label: '购买门票', prompt: '我想购买景区门票。' },
      { label: '预约入园', prompt: '帮我预约今天的入园名额。' }
    ],
    style: 'efficient',
    tags: [
      { label: '便捷', score: 99 },
      { label: '官方', score: 100 },
      { label: '快速', score: 98 }
    ],
    description: '官方票务服务。提供门票预订、入园预约、优惠政策查询等服务，助您快速开启旅程。',
    usefulInfo: {
      type: 'comfort',
      color: 'green',
      title: '今日票务',
      subtitle: '余票充足 · 可预约',
      emoji: '🎫'
    }
  },
  {
    id: 'guide',
    name: '路线引导',
    tagline: '路线活地图',
    avatarUrl: IMG_GUIDE,
    cardImageUrl: 'https://picsum.photos/seed/guide/600/400',
    actions: [
      { label: '查看热力图', prompt: '请显示当前景区的游客热力图分布。' },
      { label: '避堵路线', prompt: '帮我规划一条避开拥堵的游览路线。' }
    ],
    style: 'efficient',
    tags: [
      { label: '精准度', score: 98 },
      { label: '响应快', score: 95 },
      { label: '全覆盖', score: 99 }
    ],
    description: '我是您的专属引路人。无论您身在何处，只要告诉我目的地，我都能为您规划出最省时、最便捷的路线。',
    usefulInfo: {
      type: 'comfort',
      color: 'green',
      title: '当前拥挤度',
      subtitle: '舒适 · 宜游览',
      emoji: '🍃'
    }
  },
  {
    id: 'story',
    name: '文化讲解',
    tagline: '古今通晓',
    avatarUrl: IMG_STORY,
    cardImageUrl: 'https://picsum.photos/seed/story/600/400',
    actions: [
      { label: '讲个趣闻', prompt: '给我讲一个关于这里的有趣历史传说。' },
      { label: '历史问答', prompt: '考考我关于这里的历史知识吧。' }
    ],
    style: 'friendly',
    tags: [
      { label: '博学值', score: 99 },
      { label: '故事力', score: 96 },
      { label: '沉浸感', score: 92 }
    ],
    description: '我是这里的说书人。每一块青石板，每一座老宅院，都有它尘封的往事。让我为您娓娓道来。',
    usefulInfo: {
      type: 'tip',
      color: 'blue',
      title: '当前位置',
      subtitle: '云峰博物馆附近',
      emoji: '📍'
    }
  },
  {
    id: 'event',
    name: '活动助手',
    tagline: '快乐制造机',
    avatarUrl: IMG_EVENT,
    cardImageUrl: 'https://picsum.photos/seed/event/600/400',
    actions: [
      { label: '今日演出', prompt: '今天有哪些不容错过的演出表演？' },
      { label: '规划一日游', prompt: '我想预约参加晚上的篝火晚会。' }
    ],
    style: 'enthusiastic',
    tags: [
      { label: '活力值', score: 98 },
      { label: '气氛组', score: 95 },
      { label: '资讯通', score: 94 }
    ],
    description: '最近这些活动非常热门，推荐给您！',
    usefulInfo: {
      type: 'event',
      color: 'green',
      title: '正在热映',
      subtitle: '非遗地戏表演 (主舞台)',
      emoji: '🎭'
    },
    recommendations: [
      {
        id: 'r1',
        label: '01',
        title: '地戏表演',
        imageUrl: 'https://picsum.photos/seed/dixi/300/300',
        rating: '4.9分',
        price: '免费'
      },
      {
        id: 'r2',
        label: '02',
        title: '篝火晚会',
        imageUrl: 'https://picsum.photos/seed/bonfire/300/300',
        rating: '4.8分',
        price: '¥30/人'
      },
      {
        id: 'r3',
        label: '03',
        title: '傩戏体验',
        imageUrl: 'https://picsum.photos/seed/nuo/300/300',
        rating: '4.7分',
        price: '¥50/人'
      }
    ]
  },
  {
    id: 'service',
    name: '找设施',
    tagline: '贴心小棉袄',
    avatarUrl: IMG_SERVICE,
    cardImageUrl: 'https://picsum.photos/seed/service/600/400',
    actions: [
      { label: '找洗手间', prompt: '请告诉我现在离我最近的洗手间在哪里？' },
      { label: '紧急呼叫', prompt: '我需要紧急帮助，请联系工作人员。' }
    ],
    style: 'friendly',
    tags: [
      { label: '亲和力', score: 99 },
      { label: '细心度', score: 97 },
      { label: '服务值', score: 96 }
    ],
    description: '我是服务助手。找厕所、找停车场、借轮椅……这些琐碎小事都交给我，让您的游玩体验无忧无虑。',
    usefulInfo: {
      type: 'tip',
      color: 'yellow',
      title: '最近设施',
      subtitle: '洗手间 (50m) · 停车场 (200m)',
      emoji: '🚻'
    }
  },
  {
    id: 'photo',
    name: '旅拍助手',
    tagline: '审美天花板',
    avatarUrl: IMG_PHOTO,
    cardImageUrl: 'https://picsum.photos/seed/photo/600/400',
    actions: [
      { label: '推荐机位', prompt: '推荐几个现在光线最好的拍照机位。' },
      { label: '拍照指导', prompt: '教我几个适合这里的拍照姿势。' }
    ],
    style: 'efficient',
    tags: [
      { label: '审美力', score: 98 },
      { label: '出片率', score: 96 },
      { label: '构图感', score: 95 }
    ],
    description: '好多游客都去过附近这些拍照点哦！',
    usefulInfo: {
      type: 'recommendation',
      color: 'blue',
      title: '最佳机位',
      subtitle: '云山屯古戏台 (距您120m)',
      emoji: '📸'
    },
    recommendations: [
      {
        id: 'p1',
        label: '01',
        title: '鼓楼',
        imageUrl: 'https://picsum.photos/seed/drum/300/300',
        rating: '5.0分',
        price: '免费'
      },
      {
        id: 'p2',
        label: '02',
        title: '民族大巡游',
        imageUrl: 'https://picsum.photos/seed/parade/300/300',
        rating: '5.0分',
        price: '免费'
      },
      {
        id: 'p3',
        label: '03',
        title: '1958创意园',
        imageUrl: 'https://picsum.photos/seed/creative/300/300',
        rating: '5.0分',
        price: '收费'
      }
    ]
  },
  {
    id: 'local',
    name: '周边玩家',
    tagline: '地道老饕',
    avatarUrl: IMG_LOCAL,
    cardImageUrl: 'https://picsum.photos/seed/food/600/400',
    actions: [
      { label: '特色美食', prompt: '推荐几道必吃的本地特色菜。' },
      { label: '避雷指南', prompt: '有哪些网红店是不推荐去的？' }
    ],
    style: 'enthusiastic',
    tags: [
      { label: '寻味力', score: 99 },
      { label: '本地通', score: 95 },
      { label: '性价比', score: 92 }
    ],
    description: '好多游客都去过附近这些美食店哦！',
    usefulInfo: {
      type: 'recommendation',
      color: 'red',
      title: '饭点提醒',
      subtitle: '周边3家好评餐厅排队少',
      emoji: '🍜'
    },
    recommendations: [
      {
        id: 'f1',
        label: '01',
        title: '酸汤鱼',
        imageUrl: 'https://picsum.photos/seed/fish/300/300',
        rating: '4.9分',
        price: '¥60/人'
      },
      {
        id: 'f2',
        label: '02',
        title: '丝娃娃',
        imageUrl: 'https://picsum.photos/seed/silk/300/300',
        rating: '4.8分',
        price: '¥25/人'
      },
      {
        id: 'f3',
        label: '03',
        title: '豆腐圆子',
        imageUrl: 'https://picsum.photos/seed/tofu/300/300',
        rating: '4.7分',
        price: '¥15/人'
      }
    ]
  },
  {
    id: 'all_around_gift',
    name: '全能助手',
    tagline: '专属福利',
    avatarUrl: IMG_ALL_AROUND,
    cardImageUrl: 'https://picsum.photos/seed/gift/600/400',
    actions: [
      { label: '领取福利', prompt: '我想领取游园大礼包。' }
    ],
    style: 'enthusiastic',
    tags: [],
    description: '景区超热闹~专属福利等你来！',
    usefulInfo: {
      type: 'event',
      color: 'red',
      title: '限时福利',
      subtitle: '游园大礼包',
      emoji: '🎁'
    },
    giftContent: {
      title: '游园大礼包',
      items: [
        { label: '旅拍', value: 'AI 修图免费1次' },
        { label: '餐饮', value: '指定商户满 50 减 10 优惠券' }
      ],
      buttonText: '一键领取'
    }
  },
  {
    id: 'local_attractions',
    name: '周边玩家',
    tagline: '周边游玩',
    avatarUrl: IMG_LOCAL,
    cardImageUrl: 'https://picsum.photos/seed/attraction/600/400',
    actions: [
      { label: '查看详情', prompt: '给我介绍一下周边的这些景点。' },
      { label: '导航前往', prompt: '我想去黄果树瀑布，怎么走？' }
    ],
    style: 'enthusiastic',
    tags: [],
    description: '除了云峰屯堡，周边还有这些好玩的地方！',
    usefulInfo: {
      type: 'recommendation',
      color: 'green',
      title: '周边推荐',
      subtitle: '热门景点推荐',
      emoji: '🏞️'
    },
    recommendations: [
      {
        id: 'a1',
        label: '01',
        title: '黄果树瀑布',
        imageUrl: 'https://picsum.photos/seed/waterfall/300/300',
        rating: '5.0分',
        price: '45km'
      },
      {
        id: 'a2',
        label: '02',
        title: '天龙屯堡',
        imageUrl: 'https://picsum.photos/seed/castle/300/300',
        rating: '4.8分',
        price: '15km'
      },
      {
        id: 'a3',
        label: '03',
        title: '安顺小吃街',
        imageUrl: 'https://picsum.photos/seed/snack/300/300',
        rating: '4.9分',
        price: '20km'
      }
    ]
  }
];

// Helper to get cards by ID
const getCard = (id: string) => HERO_CARDS.find(c => c.id === id)!;

export const INITIAL_CARDS_OUTSIDE = [
  {
    id: 'flow_status',
    name: '客流状态',
    tagline: '舒适',
    avatarUrl: IMG_GUIDE,
    cardImageUrl: 'https://picsum.photos/seed/flow/600/400',
    actions: [
      { label: '购票预约', prompt: '我想购买景区门票。' }
    ],
    style: 'efficient',
    tags: [],
    description: '当前景区客流较少，游览体验舒适，建议立即购票入园。',
    usefulInfo: {
      type: 'comfort',
      color: 'green',
      title: '当前客流较少',
      subtitle: '宜游览',
      emoji: '🍃'
    }
  },
  {
    id: 'parking_status',
    name: '停车位',
    tagline: '充足',
    avatarUrl: IMG_SERVICE,
    cardImageUrl: 'https://picsum.photos/seed/parking/600/400',
    actions: [
      { label: '去导航', prompt: '请导航到西门停车场。' }
    ],
    style: 'efficient',
    tags: [],
    description: '西门停车场目前车位充足，停车方便。',
    usefulInfo: {
      type: 'comfort',
      color: 'blue',
      title: '西门停车场',
      titleSuffix: ' · 最多人选择',
      subtitle: '剩583车位',
      emoji: '🅿️'
    }
  }
];

export const INITIAL_CARDS_INSIDE = [
  {
    id: 'restroom_status',
    name: '找设施',
    tagline: '便捷',
    avatarUrl: IMG_SERVICE,
    cardImageUrl: 'https://picsum.photos/seed/restroom/600/400',
    actions: [
      { label: '去导航', prompt: '请带我去最近的洗手间。' }
    ],
    style: 'efficient',
    tags: [],
    description: '最近的洗手间在您当前位置前方100米处。',
    usefulInfo: {
      type: 'tip',
      color: 'blue',
      title: '最近洗手间',
      subtitle: '距您100m',
      emoji: '🚻'
    }
  },
  {
    id: 'event_upcoming',
    name: '活动助手',
    tagline: '精彩',
    avatarUrl: IMG_EVENT,
    cardImageUrl: 'https://picsum.photos/seed/upcoming/600/400',
    actions: [
      { label: '去观看', prompt: '我想去看即将开始的地戏表演。' }
    ],
    style: 'enthusiastic',
    tags: [],
    description: '非遗地戏表演将在30分钟后于主舞台开始，精彩不容错过！',
    usefulInfo: {
      type: 'event',
      color: 'purple',
      title: '即将开始',
      subtitle: '非遗地戏表演 (30mins后)',
      emoji: '🎭'
    }
  }
];

export const PUSH_CARDS_OUTSIDE = [
  getCard('all_around_gift'),
  getCard('local_attractions'),
  getCard('event')
];

export const PUSH_CARDS_INSIDE = [
  getCard('photo'),
  getCard('local'),
  getCard('guide')
];

export const OUTSIDE_CHIPS = [
  { label: "购门票", icon: "ticket" },
  { label: "怎么去", icon: "bus" },
  { label: "看攻略", icon: "map" },
  { label: "全部服务", icon: "grid" }
];

export const INSIDE_CHIPS = [
  { label: "找厕所", icon: "map-pin" },
  { label: "听讲解", icon: "headphones" },
  { label: "找美食", icon: "utensils" },
  { label: "全部服务", icon: "grid" }
];

export const ALL_SERVICES: ServiceCategory[] = [
  {
    title: "游前准备",
    items: [
      { name: "预约购票", icon: "ticket" },
      { name: "交通指南", icon: "bus" },
      { name: "景区介绍", icon: "info" },
      { name: "游玩攻略", icon: "map" },
    ]
  },
  {
    title: "游中服务",
    items: [
      { name: "语音讲解", icon: "headphones" },
      { name: "智慧厕所", icon: "map-pin" },
      { name: "智慧停车", icon: "car" },
      { name: "紧急求助", icon: "phone" },
      { name: "文创商店", icon: "shopping-bag" },
      { name: "餐饮推荐", icon: "coffee" },
    ]
  },
  {
    title: "游后互动",
    items: [
      { name: "投诉建议", icon: "message-square" },
      { name: "精彩瞬间", icon: "image" },
      { name: "满意度评价", icon: "star" },
    ]
  }
];