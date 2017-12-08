package com.andoliv.delivery.repository;

import com.andoliv.delivery.domain.DeliveryMan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the DeliveryMan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryManRepository extends JpaRepository<DeliveryMan, Long> {

}
