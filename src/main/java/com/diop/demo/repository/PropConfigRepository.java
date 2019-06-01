package com.diop.demo.repository;

import com.diop.demo.domain.PropConfig;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PropConfig entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropConfigRepository extends JpaRepository<PropConfig, Long> {

}
