package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Player;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Map;


@Repository
public class PlayerCriteriaRepository {
    @PersistenceContext
    EntityManager entityManager;

    protected Session currentSession() {
        return entityManager.unwrap(Session.class);
    }

    public List<Player> findByPlayerBetweenAssists(int minAssist, int maxAssists) {
        return (List<Player>) currentSession()
            .createCriteria(Player.class)
            .add(Restrictions.between("asistencias", minAssist, maxAssists)).list();
    }

    public List<Player> findByParameters(Map<String, Object> parameters) {
        Criteria playerCriteria = currentSession().createCriteria(Player.class);

        for (String param : parameters.keySet()) {
            Object value = parameters.get(param);

            addFilter(param, value, playerCriteria);

        }

        playerCriteria.addOrder(Order.asc("baskets"));

        List<Player> results = playerCriteria.list();
        return results;
    }

    private void addFilter(String param, Object value, Criteria playerCriteria) {

        if (param.equals("id") || param.equals("posicionCampo")) {
            playerCriteria.add(Restrictions.eq(param, value));
        }

        if (param.equals("baskets")) {
            playerCriteria.add(Restrictions.ge(param, value));
        }

        if (param.equals("rebotes")) {
            playerCriteria.add(Restrictions.le(param, value));
        }

    }
}
