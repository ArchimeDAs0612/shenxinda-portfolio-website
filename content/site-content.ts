/**
 * 图片维护入口
 *
 * 最简单的更新方式：把新照片按下面的文件名放进 public/images 对应文件夹。
 * 只有需要修改标题、替代文字或裁切位置时，才需要编辑本文件。
 */
export const mediaContent = {
  profile: {
    src: 'images/profile/profile-main.jpg',
    alt: '沈鑫达个人照片',
    label: 'PORTRAIT / 01',
    fallbackTitle: '个人照片待补充',
    caption: '职业与生活气质融合的主照片',
    objectPosition: 'center 22%',
  },
  life: {
    campus: {
      src: 'images/life/life-xmu-01.jpg',
      alt: '沈鑫达在厦门大学的校园照片',
      label: 'LIFE / CAMPUS',
      fallbackTitle: '校园照片待补充',
      objectPosition: 'center center',
    },
    running: {
      src: 'images/life/running-01.jpg',
      alt: '沈鑫达跑步或运动照片',
      label: 'RUNNING / MOMENTS',
      fallbackTitle: '运动照片待补充',
      objectPosition: 'center center',
    },
  },
} as const;
