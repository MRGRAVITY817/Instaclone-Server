export const extractHashtags = (caption: string) => {
  const hashtags = caption.match(/#[\w]+/g) || [];
  return hashtags.map((hashtag: string) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
