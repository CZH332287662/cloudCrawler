const config = {
  productListUrl: "https://www.freereceivesms.com/",
  productSelector: ".number-boxes-item",
  fileName: "freereceivesms",
  title: "免费短信接收",
  rateLimit: 500,
  isThirdCategory: true,
  getProductListInfo: function ($, el) {
    const productElem = $(el);
    const number = productElem.find(".text-truncate").text().trim();
    const country = productElem.find(".text-muted").text().trim();
    const link = productElem.find(".nav-link").attr("href");
    const productInfo = {};
    if(number!=''&&country!=''){
        productInfo.number = number;
        productInfo.country = country;
        productInfo.link = `https://www.freereceivesms.com${link}`;
    }
    return productInfo;
  },
  getProductDetailInfo: function ($, productInfo) {
    if (!$) {
      console.error(`触发防护，请适当增大rateLimit`);
      process.exit(0);
    }
    let panels = $(".row.border-bottom");
    productInfo.desc_info = [];
    panels.each((index, panel) => {
    const from = $(panel).find(".align-middle").text().trim();
      const before = $(panel).find(".d-none.d-lg-block");
      const before_time = before.text().trim();
      const content = before.next().text().trim();
      if (number != "System" && number != "") {
        productInfo.desc_info.push({
          from: from,
          before_time: before_time,
          content: content,
        });
      }
    });
    return productInfo;
  },
};

module.exports = config;
