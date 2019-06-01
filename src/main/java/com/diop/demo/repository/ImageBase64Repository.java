package com.diop.demo.repository;

import com.diop.demo.domain.ImageBase64;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ImageBase64 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageBase64Repository extends JpaRepository<ImageBase64, Long> {

}
