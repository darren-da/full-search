package repository;

import com.zhou.essearch.document.OrderDocument;
import com.zhou.essearch.document.ProductDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Component;

/**
 * Created by zzc on 2019/11/10.
 */
@Component
public interface OrderDocumentRepository extends ElasticsearchRepository<OrderDocument,String> {
}
