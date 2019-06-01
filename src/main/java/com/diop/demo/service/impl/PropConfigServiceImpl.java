package com.diop.demo.service.impl;

import com.diop.demo.service.PropConfigService;
import com.diop.demo.domain.PropConfig;
import com.diop.demo.repository.PropConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PropConfig.
 */
@Service
@Transactional
public class PropConfigServiceImpl implements PropConfigService {

    private final Logger log = LoggerFactory.getLogger(PropConfigServiceImpl.class);

    private final PropConfigRepository propConfigRepository;

    public PropConfigServiceImpl(PropConfigRepository propConfigRepository) {
        this.propConfigRepository = propConfigRepository;
    }

    /**
     * Save a propConfig.
     *
     * @param propConfig the entity to save
     * @return the persisted entity
     */
    @Override
    public PropConfig save(PropConfig propConfig) {
        log.debug("Request to save PropConfig : {}", propConfig);
        return propConfigRepository.save(propConfig);
    }

    /**
     * Get all the propConfigs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PropConfig> findAll(Pageable pageable) {
        log.debug("Request to get all PropConfigs");
        return propConfigRepository.findAll(pageable);
    }


    /**
     * Get one propConfig by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PropConfig> findOne(Long id) {
        log.debug("Request to get PropConfig : {}", id);
        return propConfigRepository.findById(id);
    }

    /**
     * Delete the propConfig by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PropConfig : {}", id);        propConfigRepository.deleteById(id);
    }
}
