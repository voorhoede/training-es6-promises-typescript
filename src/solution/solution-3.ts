/*
    make quality and file optional.
*/

namespace solution3 {

  type File = string;

  type Item = {
    meta?: ItemMeta
  }

  type ItemMeta = {
    quality?: Quality
    file?: File
  }

  type Quality = {
    low?: File;
    high?: File;
  }

  const patheThuisApiResponse: Item[] = [
    {
      meta: {
        file: 'some_file.mp4',
      }
    },

    {
      meta: {
        quality: {
          low: 'some_other_file.mp4',
        },
      },
    },
  ];

  const getHighestQualityFile = (item: Item): string => {
    if(item.meta) {
      if(item.meta.quality) {
        if(item.meta.quality.high) {
          return item.meta.quality.high;
        }
        if(item.meta.quality.low) {
          return item.meta.quality.low;
        }
      }
      if(item.meta.file) {
        return item.meta.file;
      }
    }
    return 'placeholder.mp4';
  }
}

