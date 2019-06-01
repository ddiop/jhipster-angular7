package com.diop.demo.service.impl;

import com.diop.demo.service.CommercantService;
import com.diop.demo.domain.Commercant;
import com.diop.demo.repository.CommercantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Commercant.
 */
@Service
@Transactional
public class CommercantServiceImpl implements CommercantService {

    private final Logger log = LoggerFactory.getLogger(CommercantServiceImpl.class);

    private final CommercantRepository commercantRepository;

    public CommercantServiceImpl(CommercantRepository commercantRepository) {
        this.commercantRepository = commercantRepository;
    }

    /**
     * Save a commercant.
     *
     * @param commercant the entity to save
     * @return the persisted entity
     */
    @Override
    public Commercant save(Commercant commercant) {
        log.debug("Request to save Commercant : {}", commercant);
        return commercantRepository.save(commercant);
    }

    /**
     * Get all the commercants.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Commercant> findAll(Pageable pageable) {
        log.debug("Request to get all Commercants");
        return commercantRepository.findAll(pageable);
    }


    /**
     * Get one commercant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Commercant> findOne(Long id) {
        log.debug("Request to get Commercant : {}", id);
        return commercantRepository.findById(id);
    }

    /**
     * Delete the commercant by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commercant : {}", id);        commercantRepository.deleteById(id);
    }
}
