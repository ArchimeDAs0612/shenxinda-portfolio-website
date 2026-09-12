/**
 * 图片维护入口
 *
 * 最简单的更新方式：把新照片按下面的文件名放进 public/images 对应文件夹。
 * 只有需要修改标题、替代文字或裁切位置时，才需要编辑本文件。
 */
export const mediaContent = {
  profile: {
    src: 'images/profile/bdf5afa6a8fc8fc136fd282f6c467fcd.jpg',
    alt: '沈鑫达个人照片',
    label: 'PORTRAIT / 01',
    fallbackTitle: '个人照片待补充',
    caption: '职业与生活气质融合的主照片',
    objectPosition: 'center 22%',
  },
  life: {
    photos: [
      { src: 'images/life/0dbd0abefc3ea20ab818ea0475507d72.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 01', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/cf9e11a351b5b4d49de804aa7940a338.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 02', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/dd649bd5e34d58886dc309f5342ddba5.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 03', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/7d079c80b9942db6c7f76cca73c435de.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 04', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/d38eb87554af6ea5b8eb9691eeaae90a.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 05', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/7569bf20ad9b38c279c4e7a0a70151ae.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 06', fallbackTitle: '生活照片', objectPosition: 'center center' },
      { src: 'images/life/01800023a656a81b59b9b2f526542738.jpg', alt: '沈鑫达的生活照片', label: 'LIFE / 07', fallbackTitle: '生活照片', objectPosition: 'center center' },
    ],
  },
  background: {
    src: 'images/background/ee50ae865578ee88302cdbbf08897ff9.jpg',
    alt: '海边与风车的生活场景',
    label: 'LIFE / ON THE ROAD',
    fallbackTitle: '生活影像',
    objectPosition: 'center center',
  },
} as const;
