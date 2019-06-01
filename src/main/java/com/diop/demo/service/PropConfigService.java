package com.diop.demo.service;

import com.diop.demo.domain.PropConfig;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing PropConfig.
 */
public interface PropConfigService {

    /**
     * Save a propConfig.
     *
     * @param propConfig the entity to save
     * @return the persisted entity
     */
    PropConfig save(PropConfig propConfig);

    /**
     * Get all the propConfigs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PropConfig> findAll(Pageable pageable);


    /**
     * Get the "id" propConfig.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<PropConfig> findOne(Long id);

    /**
     * Delete the "id" propConfig.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
