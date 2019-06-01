package com.diop.demo.service.impl;

import com.diop.demo.service.ParticipantService;
import com.diop.demo.domain.Participant;
import com.diop.demo.repository.ParticipantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Participant.
 */
@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    private final Logger log = LoggerFactory.getLogger(ParticipantServiceImpl.class);

    private final ParticipantRepository participantRepository;

    public ParticipantServiceImpl(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    /**
     * Save a participant.
     *
     * @param participant the entity to save
     * @return the persisted entity
     */
    @Override
    public Participant save(Participant participant) {
        log.debug("Request to save Participant : {}", participant);
        return participantRepository.save(participant);
    }

    /**
     * Get all the participants.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Participant> findAll() {
        log.debug("Request to get all Participants");
        return participantRepository.findAll();
    }


    /**
     * Get one participant by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Participant> findOne(Long id) {
        log.debug("Request to get Participant : {}", id);
        return participantRepository.findById(id);
    }

    /**
     * Delete the participant by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Participant : {}", id);        participantRepository.deleteById(id);
    }
}
