package com.diop.demo.service.impl;

import com.diop.demo.service.CommercantInformationsService;
import com.diop.demo.domain.CommercantInformations;
import com.diop.demo.repository.CommercantInformationsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing CommercantInformations.
 */
@Service
@Transactional
public class CommercantInformationsServiceImpl implements CommercantInformationsService {

    private final Logger log = LoggerFactory.getLogger(CommercantInformationsServiceImpl.class);

    private final CommercantInformationsRepository commercantInformationsRepository;

    public CommercantInformationsServiceImpl(CommercantInformationsRepository commercantInformationsRepository) {
        this.commercantInformationsRepository = commercantInformationsRepository;
    }

    /**
     * Save a commercantInformations.
     *
     * @param commercantInformations the entity to save
     * @return the persisted entity
     */
    @Override
    public CommercantInformations save(CommercantInformations commercantInformations) {
        log.debug("Request to save CommercantInformations : {}", commercantInformations);
        return commercantInformationsRepository.save(commercantInformations);
    }

    /**
     * Get all the commercantInformations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CommercantInformations> findAll(Pageable pageable) {
        log.debug("Request to get all CommercantInformations");
        return commercantInformationsRepository.findAll(pageable);
    }


    /**
     * Get one commercantInformations by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CommercantInformations> findOne(Long id) {
        log.debug("Request to get CommercantInformations : {}", id);
        return commercantInformationsRepository.findById(id);
    }

    /**
     * Delete the commercantInformations by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommercantInformations : {}", id);        commercantInformationsRepository.deleteById(id);
    }
}
