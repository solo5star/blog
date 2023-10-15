import type { ComponentPropsWithoutRef } from 'react';

const VIDEO_EXTENSIONS = ['.webm'];

type ImageProps = {
  src: string;
} & ComponentPropsWithoutRef<'img'>;

/**
 * This is an Image component compatible with video files as well.
 *
 * If a video is provided, it will be displayed as a moving image, similar to a gif.
 */
const Image = (props: ImageProps) => {
  const { src, ...restProps } = props;

  if (VIDEO_EXTENSIONS.some((ext) => src.endsWith(ext))) {
    return (
      <video src={src} preload="auto" muted autoPlay playsInline controls={false} loop {...(restProps as object)} />
    );
  }
  return <img src={src} {...restProps} />;
};

export default Image;
