class MarketItem {
    constructor(title, price, image, href) {
        this.title = !!title ? title.replaceAll(/[\n|\s]/g, '') : '';
        this.price = !!price ? parseInt(price.replace(/,/g, '')) : '0';
        this.image = image;
        this.href = href;
    }

    static ofEmpty() {
        let marketItem = new MarketItem();
        marketItem.title = '';
        marketItem.price = '0';
        marketItem.image = '';
        marketItem.href = '';
        return marketItem;
    }
}

module.exports = { MarketItem }