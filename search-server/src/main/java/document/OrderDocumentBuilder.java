package document;

import java.util.Date;

/**
 * 创建实体类
 */

public class OrderDocumentBuilder {
    private static OrderDocument orderDocument;

    public static OrderDocumentBuilder create(){
        orderDocument = new OrderDocument();
        return new OrderDocumentBuilder();
    }

    public OrderDocumentBuilder addId(String id) {
        orderDocument.setId(id);
        return this;
    }

    public OrderDocumentBuilder addOrderName(String orderName) {
        orderDocument.setOrderName(orderName);
        return this;
    }

    public OrderDocumentBuilder addOrderDesc(String orderDesc) {
        orderDocument.setOrderDesc(orderDesc);
        return this;
    }

    public OrderDocumentBuilder addAmount(Double amount){
        orderDocument.setAmount(amount);
        return this;
    }

    public OrderDocumentBuilder addProductCount(Integer productCount){
        orderDocument.setProductCount(productCount);
        return this;
    }

    public OrderDocumentBuilder addCreateTime(Date createTime) {
        orderDocument.setCreateTime(createTime);
        return this;
    }

    public OrderDocumentBuilder addUpdateTime(Date updateTime) {
        orderDocument.setUpdateTime(updateTime);
        return this;
    }

    public OrderDocument builder() {
        return orderDocument;
    }
}
