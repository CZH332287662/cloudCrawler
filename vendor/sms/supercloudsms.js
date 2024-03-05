const config = {
    productListUrl: 'https://www.supercloudsms.com/',
    productSelector: '.card.box-shadow',
    fileName: 'supercloudsms',
    title: '超级云短信',
    rateLimit: 500,
    isThirdCategory: true,
    getProductListInfo: function ($, el) {
      const productElem = $(el);
      const number = productElem.find('.card-header').text().trim();
    //   const number = productElem.find('.card-header').text().split(" ").trim()[0];
      const country = productElem.find('.card-body').text().trim();
      const link = productElem.find('.card-footer').attr('href');
      const productInfo = {};
      productInfo.number = number;
      productInfo.country = country;
      productInfo.link = `https://www.supercloudsms.com${link}`;
      return productInfo;
    },
    getProductDetailInfo: function ($, productInfo) {
      if (!$) {
        console.error(`触发防护，请适当增大rateLimit`);
        process.exit(0);
      }
      let panels = $(".card.mb-3");
      productInfo.desc_info = [];
      panels.each((index, panel) => {
        const before_time = $(panel).find('.rounded-pill').text().trim();
        const number = $(panel).find('.float-end').text().trim();
        const content = $(panel).find(".card-body").text().trim();
        if(number!='System'&&number!=''){
            productInfo.desc_info.push({
              before_time: before_time,
              number: number,
              content: content,
            });
        }
      });
      return productInfo;
    },
  };
  
  module.exports = config;
  