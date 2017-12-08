package com.andoliv.delivery.web.rest;

import com.andoliv.delivery.domain.State;
import com.andoliv.delivery.repository.StateRepository;
import com.andoliv.delivery.web.rest.errors.BadRequestAlertException;
import com.andoliv.delivery.web.rest.util.HeaderUtil;
import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing State.
 */
@RestController
@RequestMapping("/api")
public class StateResource {

    private static final String ENTITY_NAME = "state";
    private final Logger log = LoggerFactory.getLogger(StateResource.class);
    private final StateRepository stateRepository;

    public StateResource(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    /**
     * POST  /states : Create a new state.
     *
     * @param state the state to create
     * @return the ResponseEntity with status 201 (Created) and with body the new state, or with status 400 (Bad Request) if the state has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/states")
    @Timed
    public ResponseEntity<State> createState(@Valid @RequestBody State state) throws URISyntaxException {
        log.debug("REST request to save State : {}", state);
        if (state.getId() != null) {
            throw new BadRequestAlertException("A new state cannot already have an ID", ENTITY_NAME, "idexists");
        }
        State result = stateRepository.save(state);
        return ResponseEntity.created(new URI("/api/states/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /states : Updates an existing state.
     *
     * @param state the state to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated state,
     * or with status 400 (Bad Request) if the state is not valid,
     * or with status 500 (Internal Server Error) if the state couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/states")
    @Timed
    public ResponseEntity<State> updateState(@Valid @RequestBody State state) throws URISyntaxException {
        log.debug("REST request to update State : {}", state);
        if (state.getId() == null) {
            return createState(state);
        }
        State result = stateRepository.save(state);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, state.getId().toString()))
            .body(result);
    }

    /**
     * GET  /states : get all the states.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of states in body
     */
    @GetMapping("/states")
    @Timed
    public List<State> getAllStates() {
        log.debug("REST request to get all States");
        return stateRepository.findAll();
    }

    /**
     * GET  /states/:id : get the "id" state.
     *
     * @param id the id of the state to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the state, or with status 404 (Not Found)
     */
    @GetMapping("/states/{id}")
    @Timed
    public ResponseEntity<State> getState(@PathVariable Long id) {
        log.debug("REST request to get State : {}", id);
        State state = stateRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(state));
    }

    /**
     * DELETE  /states/:id : delete the "id" state.
     *
     * @param id the id of the state to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/states/{id}")
    @Timed
    public ResponseEntity<Void> deleteState(@PathVariable Long id) {
        log.debug("REST request to delete State : {}", id);
        stateRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
