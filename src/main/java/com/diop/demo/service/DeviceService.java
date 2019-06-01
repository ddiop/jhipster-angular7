package com.diop.demo.service;

import com.diop.demo.domain.Device;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Device.
 */
public interface DeviceService {

    /**
     * Save a device.
     *
     * @param device the entity to save
     * @return the persisted entity
     */
    Device save(Device device);

    /**
     * Get all the devices.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Device> findAll(Pageable pageable);


    /**
     * Get the "id" device.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Device> findOne(Long id);

    /**
     * Delete the "id" device.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
