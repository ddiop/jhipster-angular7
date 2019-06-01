package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.Device;
import com.diop.demo.repository.DeviceRepository;
import com.diop.demo.service.DeviceService;
import com.diop.demo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.diop.demo.web.rest.TestUtil.sameInstant;
import static com.diop.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeviceResource REST controller.
 *
 * @see DeviceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class DeviceResourceIntTest {

    private static final String DEFAULT_UUID = "AAAAAAAAAA";
    private static final String UPDATED_UUID = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO = "0727928344";
    private static final String UPDATED_NUMERO = "0697139683";

    private static final Integer DEFAULT_INDICATIF_INTERNATIONAL = 0;
    private static final Integer UPDATED_INDICATIF_INTERNATIONAL = 1;

    private static final String DEFAULT_NOTIFICATION_UID = "AAAAAAAAAA";
    private static final String UPDATED_NOTIFICATION_UID = "BBBBBBBBBB";

    private static final String DEFAULT_MARQUE = "AAAAAAAAAA";
    private static final String UPDATED_MARQUE = "BBBBBBBBBB";

    private static final String DEFAULT_MODEL = "AAAAAAAAAA";
    private static final String UPDATED_MODEL = "BBBBBBBBBB";

    private static final Integer DEFAULT_ACTIVATION_CODE = 1000;
    private static final Integer UPDATED_ACTIVATION_CODE = 1001;

    private static final Integer DEFAULT_ACTIVATION_TENTATIVE = 0;
    private static final Integer UPDATED_ACTIVATION_TENTATIVE = 1;

    private static final ZonedDateTime DEFAULT_ACTIVATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ACTIVATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDeviceMockMvc;

    private Device device;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeviceResource deviceResource = new DeviceResource(deviceService);
        this.restDeviceMockMvc = MockMvcBuilders.standaloneSetup(deviceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Device createEntity(EntityManager em) {
        Device device = new Device()
            .uuid(DEFAULT_UUID)
            .numero(DEFAULT_NUMERO)
            .indicatifInternational(DEFAULT_INDICATIF_INTERNATIONAL)
            .notificationUid(DEFAULT_NOTIFICATION_UID)
            .marque(DEFAULT_MARQUE)
            .model(DEFAULT_MODEL)
            .activationCode(DEFAULT_ACTIVATION_CODE)
            .activationTentative(DEFAULT_ACTIVATION_TENTATIVE)
            .activationDate(DEFAULT_ACTIVATION_DATE);
        return device;
    }

    @Before
    public void initTest() {
        device = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevice() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // Create the Device
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isCreated());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate + 1);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getUuid()).isEqualTo(DEFAULT_UUID);
        assertThat(testDevice.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testDevice.getIndicatifInternational()).isEqualTo(DEFAULT_INDICATIF_INTERNATIONAL);
        assertThat(testDevice.getNotificationUid()).isEqualTo(DEFAULT_NOTIFICATION_UID);
        assertThat(testDevice.getMarque()).isEqualTo(DEFAULT_MARQUE);
        assertThat(testDevice.getModel()).isEqualTo(DEFAULT_MODEL);
        assertThat(testDevice.getActivationCode()).isEqualTo(DEFAULT_ACTIVATION_CODE);
        assertThat(testDevice.getActivationTentative()).isEqualTo(DEFAULT_ACTIVATION_TENTATIVE);
        assertThat(testDevice.getActivationDate()).isEqualTo(DEFAULT_ACTIVATION_DATE);
    }

    @Test
    @Transactional
    public void createDeviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deviceRepository.findAll().size();

        // Create the Device with an existing ID
        device.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeviceMockMvc.perform(post("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDevices() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get all the deviceList
        restDeviceMockMvc.perform(get("/api/devices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(device.getId().intValue())))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].indicatifInternational").value(hasItem(DEFAULT_INDICATIF_INTERNATIONAL)))
            .andExpect(jsonPath("$.[*].notificationUid").value(hasItem(DEFAULT_NOTIFICATION_UID.toString())))
            .andExpect(jsonPath("$.[*].marque").value(hasItem(DEFAULT_MARQUE.toString())))
            .andExpect(jsonPath("$.[*].model").value(hasItem(DEFAULT_MODEL.toString())))
            .andExpect(jsonPath("$.[*].activationCode").value(hasItem(DEFAULT_ACTIVATION_CODE)))
            .andExpect(jsonPath("$.[*].activationTentative").value(hasItem(DEFAULT_ACTIVATION_TENTATIVE)))
            .andExpect(jsonPath("$.[*].activationDate").value(hasItem(sameInstant(DEFAULT_ACTIVATION_DATE))));
    }
    
    @Test
    @Transactional
    public void getDevice() throws Exception {
        // Initialize the database
        deviceRepository.saveAndFlush(device);

        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", device.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(device.getId().intValue()))
            .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.indicatifInternational").value(DEFAULT_INDICATIF_INTERNATIONAL))
            .andExpect(jsonPath("$.notificationUid").value(DEFAULT_NOTIFICATION_UID.toString()))
            .andExpect(jsonPath("$.marque").value(DEFAULT_MARQUE.toString()))
            .andExpect(jsonPath("$.model").value(DEFAULT_MODEL.toString()))
            .andExpect(jsonPath("$.activationCode").value(DEFAULT_ACTIVATION_CODE))
            .andExpect(jsonPath("$.activationTentative").value(DEFAULT_ACTIVATION_TENTATIVE))
            .andExpect(jsonPath("$.activationDate").value(sameInstant(DEFAULT_ACTIVATION_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingDevice() throws Exception {
        // Get the device
        restDeviceMockMvc.perform(get("/api/devices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevice() throws Exception {
        // Initialize the database
        deviceService.save(device);

        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Update the device
        Device updatedDevice = deviceRepository.findById(device.getId()).get();
        // Disconnect from session so that the updates on updatedDevice are not directly saved in db
        em.detach(updatedDevice);
        updatedDevice
            .uuid(UPDATED_UUID)
            .numero(UPDATED_NUMERO)
            .indicatifInternational(UPDATED_INDICATIF_INTERNATIONAL)
            .notificationUid(UPDATED_NOTIFICATION_UID)
            .marque(UPDATED_MARQUE)
            .model(UPDATED_MODEL)
            .activationCode(UPDATED_ACTIVATION_CODE)
            .activationTentative(UPDATED_ACTIVATION_TENTATIVE)
            .activationDate(UPDATED_ACTIVATION_DATE);

        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevice)))
            .andExpect(status().isOk());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
        Device testDevice = deviceList.get(deviceList.size() - 1);
        assertThat(testDevice.getUuid()).isEqualTo(UPDATED_UUID);
        assertThat(testDevice.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testDevice.getIndicatifInternational()).isEqualTo(UPDATED_INDICATIF_INTERNATIONAL);
        assertThat(testDevice.getNotificationUid()).isEqualTo(UPDATED_NOTIFICATION_UID);
        assertThat(testDevice.getMarque()).isEqualTo(UPDATED_MARQUE);
        assertThat(testDevice.getModel()).isEqualTo(UPDATED_MODEL);
        assertThat(testDevice.getActivationCode()).isEqualTo(UPDATED_ACTIVATION_CODE);
        assertThat(testDevice.getActivationTentative()).isEqualTo(UPDATED_ACTIVATION_TENTATIVE);
        assertThat(testDevice.getActivationDate()).isEqualTo(UPDATED_ACTIVATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingDevice() throws Exception {
        int databaseSizeBeforeUpdate = deviceRepository.findAll().size();

        // Create the Device

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeviceMockMvc.perform(put("/api/devices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(device)))
            .andExpect(status().isBadRequest());

        // Validate the Device in the database
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDevice() throws Exception {
        // Initialize the database
        deviceService.save(device);

        int databaseSizeBeforeDelete = deviceRepository.findAll().size();

        // Delete the device
        restDeviceMockMvc.perform(delete("/api/devices/{id}", device.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Device> deviceList = deviceRepository.findAll();
        assertThat(deviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Device.class);
        Device device1 = new Device();
        device1.setId(1L);
        Device device2 = new Device();
        device2.setId(device1.getId());
        assertThat(device1).isEqualTo(device2);
        device2.setId(2L);
        assertThat(device1).isNotEqualTo(device2);
        device1.setId(null);
        assertThat(device1).isNotEqualTo(device2);
    }
}
