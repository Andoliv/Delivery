package com.andoliv.delivery.web.rest;

import com.andoliv.delivery.domain.DeliveryMan;
import com.andoliv.delivery.repository.DeliveryManRepository;
import com.andoliv.delivery.web.rest.errors.BadRequestAlertException;
import com.andoliv.delivery.web.rest.util.HeaderUtil;
import com.andoliv.delivery.web.rest.util.PaginationUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DeliveryMan.
 */
@RestController
@RequestMapping("/api")
public class DeliveryManResource {

    private static final String ENTITY_NAME = "deliveryMan";
    private final Logger log = LoggerFactory.getLogger(DeliveryManResource.class);
    private final DeliveryManRepository deliveryManRepository;

    public DeliveryManResource(DeliveryManRepository deliveryManRepository) {
        this.deliveryManRepository = deliveryManRepository;
    }

    /**
     * POST  /delivery-men : Create a new deliveryMan.
     *
     * @param deliveryMan the deliveryMan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryMan, or with status 400 (Bad Request) if the deliveryMan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-men")
    @Timed
    public ResponseEntity<DeliveryMan> createDeliveryMan(@RequestBody DeliveryMan deliveryMan) throws URISyntaxException {
        log.debug("REST request to save DeliveryMan : {}", deliveryMan);
        if (deliveryMan.getId() != null) {
            throw new BadRequestAlertException("A new deliveryMan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryMan result = deliveryManRepository.save(deliveryMan);
        return ResponseEntity.created(new URI("/api/delivery-men/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-men : Updates an existing deliveryMan.
     *
     * @param deliveryMan the deliveryMan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryMan,
     * or with status 400 (Bad Request) if the deliveryMan is not valid,
     * or with status 500 (Internal Server Error) if the deliveryMan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-men")
    @Timed
    public ResponseEntity<DeliveryMan> updateDeliveryMan(@RequestBody DeliveryMan deliveryMan) throws URISyntaxException {
        log.debug("REST request to update DeliveryMan : {}", deliveryMan);
        if (deliveryMan.getId() == null) {
            return createDeliveryMan(deliveryMan);
        }
        DeliveryMan result = deliveryManRepository.save(deliveryMan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryMan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-men : get all the deliveryMen.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryMen in body
     */
    @GetMapping("/delivery-men")
    @Timed
    public ResponseEntity<List<DeliveryMan>> getAllDeliveryMen(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of DeliveryMen");
        Page<DeliveryMan> page = deliveryManRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/delivery-men");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /delivery-men/:id : get the "id" deliveryMan.
     *
     * @param id the id of the deliveryMan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryMan, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-men/{id}")
    @Timed
    public ResponseEntity<DeliveryMan> getDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to get DeliveryMan : {}", id);
        DeliveryMan deliveryMan = deliveryManRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(deliveryMan));
    }

    /**
     * DELETE  /delivery-men/:id : delete the "id" deliveryMan.
     *
     * @param id the id of the deliveryMan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-men/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryMan : {}", id);
        deliveryManRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
