package com.diop.demo.service;

import com.diop.demo.domain.CommercantInformations;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing CommercantInformations.
 */
public interface CommercantInformationsService {

    /**
     * Save a commercantInformations.
     *
     * @param commercantInformations the entity to save
     * @return the persisted entity
     */
    CommercantInformations save(CommercantInformations commercantInformations);

    /**
     * Get all the commercantInformations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CommercantInformations> findAll(Pageable pageable);


    /**
     * Get the "id" commercantInformations.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CommercantInformations> findOne(Long id);

    /**
     * Delete the "id" commercantInformations.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
