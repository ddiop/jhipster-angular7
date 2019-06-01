package com.diop.demo.repository;

import com.diop.demo.domain.CommercantInformations;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CommercantInformations entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommercantInformationsRepository extends JpaRepository<CommercantInformations, Long> {

}
