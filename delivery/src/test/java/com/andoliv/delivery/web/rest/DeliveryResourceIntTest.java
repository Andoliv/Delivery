package com.andoliv.delivery.web.rest;

import com.andoliv.delivery.DeliveryApp;
import com.andoliv.delivery.domain.Delivery;
import com.andoliv.delivery.repository.DeliveryRepository;
import com.andoliv.delivery.web.rest.errors.ExceptionTranslator;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.andoliv.delivery.web.rest.TestUtil.createFormattingConversionService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeliveryResource REST controller.
 *
 * @see DeliveryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryApp.class)
public class DeliveryResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_VALUE = 1L;
    private static final Long UPDATED_VALUE = 2L;

    private static final Long DEFAULT_EXPECTED_DISTANCE = 1L;
    private static final Long UPDATED_EXPECTED_DISTANCE = 2L;

    private static final Long DEFAULT_TRAVELLED_DISTANCE = 1L;
    private static final Long UPDATED_TRAVELLED_DISTANCE = 2L;

    private static final Long DEFAULT_EXPECTED_COST = 1L;
    private static final Long UPDATED_EXPECTED_COST = 2L;

    private static final Long DEFAULT_TOTAL_COST = 1L;
    private static final Long UPDATED_TOTAL_COST = 2L;

    private static final String DEFAULT_DELIVERY_QUALITY = "AAAAAAAAAA";
    private static final String UPDATED_DELIVERY_QUALITY = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_QUALITY = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_QUALITY = "BBBBBBBBBB";

    private static final Long DEFAULT_EXPECTED_TIME = 1L;
    private static final Long UPDATED_EXPECTED_TIME = 2L;

    private static final Long DEFAULT_DELIVERY_TIME = 1L;
    private static final Long UPDATED_DELIVERY_TIME = 2L;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .value(DEFAULT_VALUE)
            .expectedDistance(DEFAULT_EXPECTED_DISTANCE)
            .travelledDistance(DEFAULT_TRAVELLED_DISTANCE)
            .expectedCost(DEFAULT_EXPECTED_COST)
            .totalCost(DEFAULT_TOTAL_COST)
            .deliveryQuality(DEFAULT_DELIVERY_QUALITY)
            .paymentQuality(DEFAULT_PAYMENT_QUALITY)
            .expectedTime(DEFAULT_EXPECTED_TIME)
            .deliveryTime(DEFAULT_DELIVERY_TIME);
        return delivery;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryResource deliveryResource = new DeliveryResource(deliveryRepository);
        this.restDeliveryMockMvc = MockMvcBuilders.standaloneSetup(deliveryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        delivery = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testDelivery.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDelivery.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testDelivery.getExpectedDistance()).isEqualTo(DEFAULT_EXPECTED_DISTANCE);
        assertThat(testDelivery.getTravelledDistance()).isEqualTo(DEFAULT_TRAVELLED_DISTANCE);
        assertThat(testDelivery.getExpectedCost()).isEqualTo(DEFAULT_EXPECTED_COST);
        assertThat(testDelivery.getTotalCost()).isEqualTo(DEFAULT_TOTAL_COST);
        assertThat(testDelivery.getDeliveryQuality()).isEqualTo(DEFAULT_DELIVERY_QUALITY);
        assertThat(testDelivery.getPaymentQuality()).isEqualTo(DEFAULT_PAYMENT_QUALITY);
        assertThat(testDelivery.getExpectedTime()).isEqualTo(DEFAULT_EXPECTED_TIME);
        assertThat(testDelivery.getDeliveryTime()).isEqualTo(DEFAULT_DELIVERY_TIME);
    }

    @Test
    @Transactional
    public void createDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery with an existing ID
        delivery.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryRepository.findAll().size();
        // set the field null
        delivery.setValue(null);

        // Create the Delivery, which fails.

        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc.perform(get("/api/deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.intValue())))
            .andExpect(jsonPath("$.[*].expectedDistance").value(hasItem(DEFAULT_EXPECTED_DISTANCE.intValue())))
            .andExpect(jsonPath("$.[*].travelledDistance").value(hasItem(DEFAULT_TRAVELLED_DISTANCE.intValue())))
            .andExpect(jsonPath("$.[*].expectedCost").value(hasItem(DEFAULT_EXPECTED_COST.intValue())))
            .andExpect(jsonPath("$.[*].totalCost").value(hasItem(DEFAULT_TOTAL_COST.intValue())))
            .andExpect(jsonPath("$.[*].deliveryQuality").value(hasItem(DEFAULT_DELIVERY_QUALITY.toString())))
            .andExpect(jsonPath("$.[*].paymentQuality").value(hasItem(DEFAULT_PAYMENT_QUALITY.toString())))
            .andExpect(jsonPath("$.[*].expectedTime").value(hasItem(DEFAULT_EXPECTED_TIME.intValue())))
            .andExpect(jsonPath("$.[*].deliveryTime").value(hasItem(DEFAULT_DELIVERY_TIME.intValue())));
    }

    @Test
    @Transactional
    public void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.intValue()))
            .andExpect(jsonPath("$.expectedDistance").value(DEFAULT_EXPECTED_DISTANCE.intValue()))
            .andExpect(jsonPath("$.travelledDistance").value(DEFAULT_TRAVELLED_DISTANCE.intValue()))
            .andExpect(jsonPath("$.expectedCost").value(DEFAULT_EXPECTED_COST.intValue()))
            .andExpect(jsonPath("$.totalCost").value(DEFAULT_TOTAL_COST.intValue()))
            .andExpect(jsonPath("$.deliveryQuality").value(DEFAULT_DELIVERY_QUALITY.toString()))
            .andExpect(jsonPath("$.paymentQuality").value(DEFAULT_PAYMENT_QUALITY.toString()))
            .andExpect(jsonPath("$.expectedTime").value(DEFAULT_EXPECTED_TIME.intValue()))
            .andExpect(jsonPath("$.deliveryTime").value(DEFAULT_DELIVERY_TIME.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findOne(delivery.getId());
        updatedDelivery
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .value(UPDATED_VALUE)
            .expectedDistance(UPDATED_EXPECTED_DISTANCE)
            .travelledDistance(UPDATED_TRAVELLED_DISTANCE)
            .expectedCost(UPDATED_EXPECTED_COST)
            .totalCost(UPDATED_TOTAL_COST)
            .deliveryQuality(UPDATED_DELIVERY_QUALITY)
            .paymentQuality(UPDATED_PAYMENT_QUALITY)
            .expectedTime(UPDATED_EXPECTED_TIME)
            .deliveryTime(UPDATED_DELIVERY_TIME);

        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelivery)))
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testDelivery.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDelivery.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testDelivery.getExpectedDistance()).isEqualTo(UPDATED_EXPECTED_DISTANCE);
        assertThat(testDelivery.getTravelledDistance()).isEqualTo(UPDATED_TRAVELLED_DISTANCE);
        assertThat(testDelivery.getExpectedCost()).isEqualTo(UPDATED_EXPECTED_COST);
        assertThat(testDelivery.getTotalCost()).isEqualTo(UPDATED_TOTAL_COST);
        assertThat(testDelivery.getDeliveryQuality()).isEqualTo(UPDATED_DELIVERY_QUALITY);
        assertThat(testDelivery.getPaymentQuality()).isEqualTo(UPDATED_PAYMENT_QUALITY);
        assertThat(testDelivery.getExpectedTime()).isEqualTo(UPDATED_EXPECTED_TIME);
        assertThat(testDelivery.getDeliveryTime()).isEqualTo(UPDATED_DELIVERY_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Create the Delivery

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);
        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Get the delivery
        restDeliveryMockMvc.perform(delete("/api/deliveries/{id}", delivery.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Delivery.class);
        Delivery delivery1 = new Delivery();
        delivery1.setId(1L);
        Delivery delivery2 = new Delivery();
        delivery2.setId(delivery1.getId());
        assertThat(delivery1).isEqualTo(delivery2);
        delivery2.setId(2L);
        assertThat(delivery1).isNotEqualTo(delivery2);
        delivery1.setId(null);
        assertThat(delivery1).isNotEqualTo(delivery2);
    }
}
