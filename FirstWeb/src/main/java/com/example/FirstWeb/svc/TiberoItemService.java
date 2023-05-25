package com.example.FirstWeb.svc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.FirstWeb.entity.TiberoItem;
import com.example.FirstWeb.repository.TiberoItemRepository;
import java.util.List;

@Service
public class TiberoItemService {
    @Autowired
    private TiberoItemRepository tiberoItemRepository;

    public List<TiberoItem> getTiberoItems() {
        List<TiberoItem> tiberoItems = tiberoItemRepository.findAll();

        if(!tiberoItems.isEmpty()) return tiberoItemRepository.findAll();
        else throw new IllegalArgumentException("no such data");
    }

    public TiberoItem getTiberoItemById(final Long id) {
        return tiberoItemRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("no such data"));
    }

    public TiberoItem createTiberoItem(final TiberoItem createTiberoItem) {
        if(createTiberoItem == null) throw new IllegalArgumentException("item cannot be null");
        return tiberoItemRepository.save(createTiberoItem);
    }

    public TiberoItem updateTiberoItem(final long id, final TiberoItem updateTiberoItem) {
        TiberoItem tiberoItem = getTiberoItemById(id);
        tiberoItem.setName(updateTiberoItem.getName());
        tiberoItem.setSold(updateTiberoItem.isSold());
        return tiberoItemRepository.save(tiberoItem);
    }

    public void deleteTiberoItemById(final Long id) {
        tiberoItemRepository.deleteById(id);
    }
}
