package com.diop.demo.service.impl;

import com.diop.demo.service.EvenementService;
import com.diop.demo.domain.Evenement;
import com.diop.demo.repository.EvenementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Evenement.
 */
@Service
@Transactional
public class EvenementServiceImpl implements EvenementService {

    private final Logger log = LoggerFactory.getLogger(EvenementServiceImpl.class);

    private final EvenementRepository evenementRepository;

    public EvenementServiceImpl(EvenementRepository evenementRepository) {
        this.evenementRepository = evenementRepository;
    }

    /**
     * Save a evenement.
     *
     * @param evenement the entity to save
     * @return the persisted entity
     */
    @Override
    public Evenement save(Evenement evenement) {
        log.debug("Request to save Evenement : {}", evenement);
        return evenementRepository.save(evenement);
    }

    /**
     * Get all the evenements.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Evenement> findAll(Pageable pageable) {
        log.debug("Request to get all Evenements");
        return evenementRepository.findAll(pageable);
    }


    /**
     * Get one evenement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Evenement> findOne(Long id) {
        log.debug("Request to get Evenement : {}", id);
        return evenementRepository.findById(id);
    }

    /**
     * Delete the evenement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Evenement : {}", id);        evenementRepository.deleteById(id);
    }
}
