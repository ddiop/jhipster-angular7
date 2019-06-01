package com.diop.demo.service;

import com.diop.demo.domain.Commercant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Commercant.
 */
public interface CommercantService {

    /**
     * Save a commercant.
     *
     * @param commercant the entity to save
     * @return the persisted entity
     */
    Commercant save(Commercant commercant);

    /**
     * Get all the commercants.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Commercant> findAll(Pageable pageable);


    /**
     * Get the "id" commercant.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Commercant> findOne(Long id);

    /**
     * Delete the "id" commercant.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
