package com.diop.demo.service;

import com.diop.demo.domain.Participant;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Participant.
 */
public interface ParticipantService {

    /**
     * Save a participant.
     *
     * @param participant the entity to save
     * @return the persisted entity
     */
    Participant save(Participant participant);

    /**
     * Get all the participants.
     *
     * @return the list of entities
     */
    List<Participant> findAll();


    /**
     * Get the "id" participant.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Participant> findOne(Long id);

    /**
     * Delete the "id" participant.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
