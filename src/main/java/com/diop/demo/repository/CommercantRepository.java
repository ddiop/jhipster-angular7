package com.diop.demo.repository;

import com.diop.demo.domain.Commercant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Commercant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommercantRepository extends JpaRepository<Commercant, Long> {

}
