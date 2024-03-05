const config = {
  productListUrl: "https://bestsms.xyz/",
  productSelector: ".phone_col",
  fileName: "bestsms",
  title: "无敌接码平台",
  maxConnections: 200,
  isThirdCategory: true,
  getProductListInfo: function ($, el) {
    const productElem = $(el);
    const sup_phone = productElem.find(".sup_phone").text();
    const phone = productElem.find(".phone").text();
    const phone_body_top = productElem.find(".phone_body_top").text().trim();
    const linkElem = productElem.find(".btn-block").attr("href");

    const productInfo = {};
    productInfo.sup_phone = sup_phone;
    productInfo.phone = phone;
    productInfo.phone_body_top = phone_body_top;
    productInfo.link = `https://bestsms.xyz${linkElem}`;

    return productInfo;
  },
  getProductDetailInfo: function ($, productInfo) {
    if (!$) {
      console.error(`触发防护，请适当增大rateLimit`);
      process.exit(0);
    }
    let panels = $(".panel");
    productInfo.desc_info = [];

    panels.each((index, panel) => {
      const timeString = $(panel).find(".panel-heading").text().trim();
      const time = timeString.split(" ")[0]; // 分割后获取第一个部分即为日期时间
      const before = $(panel).find(".badge");
      const before_time = before.text().trim();
      const number = before.next().text().trim();
      const content = $(panel).find(".panel-body>span").text().trim();
      if(number!='System'&&number!=''){
          productInfo.desc_info.push({
            time: time,
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
