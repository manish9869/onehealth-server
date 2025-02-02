
-- npx prisma migrate dev
-- npx prisma generate
-- npx prisma migrate deploy


-- Insert Permissions
INSERT INTO PERMISSION_MASTER (Name, Code) VALUES
                                               ('Create', 'CREATE'),
                                               ('Read', 'READ'),
                                               ('Update', 'UPDATE'),
                                               ('Delete', 'DELETE');

-- Insert Roles
INSERT INTO USER_TYPE_MASTER (ID, NAME, createdOn, updatedOn) VALUES
                                                                  (1, 'Super Admin', '2024-01-01 00:00:00.000', '2024-01-01 00:00:00.000'),
                                                                  (2, 'Admin', '2024-01-01 00:00:00.000', '2024-01-01 00:00:00.000'),
                                                                  (3, 'User', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (4, 'Doctor', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (5, 'Nurse', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (6, 'Receptionist', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (7, 'Patient', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (8, 'Pharmacist', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (9, 'Lab Technician', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (10, 'Accountant', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (11, 'HR', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (12, 'IT Support', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000'),
                                                                  (13, 'Guest', '2024-10-30 23:21:06.867', '2024-10-30 23:21:06.000');


-- INSERT ORGANIZATION`

INSERT INTO ORGANIZATION VALUES (1, 'United Healthcare', '101 Wellness Ave', 'San Francisco', 'CA', 'USA', '94103', '2023-01-01 00:00:00.000', '2024-11-13 14:04:05.977');
INSERT INTO ORGANIZATION VALUES (2, 'One Healthcare', '202 Harmony St', 'Los Angeles', 'CA', 'USA', '90001', '2023-02-01 00:00:00.000', '2024-11-13 14:04:05.977');

 
 
INSERT INTO ORGANIZATION_DASHBOARD VALUES (1, 520, 10500, 210, 1, '2024-01-01 10:00:00.000', '2024-01-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (2, 540, 10800, 220, 1, '2024-02-01 10:00:00.000', '2024-02-29 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (3, 560, 11000, 230, 1, '2024-03-01 10:00:00.000', '2024-03-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (4, 580, 11500, 240, 1, '2024-04-01 10:00:00.000', '2024-04-30 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (5, 600, 12000, 250, 1, '2024-05-01 10:00:00.000', '2024-05-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (6, 620, 12200, 260, 1, '2024-06-01 10:00:00.000', '2024-06-30 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (7, 580, 11700, 240, 1, '2024-07-01 10:00:00.000', '2024-07-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (8, 590, 11900, 245, 1, '2024-08-01 10:00:00.000', '2024-08-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (9, 610, 12100, 255, 1, '2024-09-01 10:00:00.000', '2024-09-30 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (10, 620, 12500, 265, 1, '2024-10-01 10:00:00.000', '2024-10-31 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (11, 640, 13000, 275, 1, '2024-11-01 10:00:00.000', '2024-11-30 23:59:59.000');
INSERT INTO ORGANIZATION_DASHBOARD VALUES (12, 660, 13500, 280, 1, '2024-12-01 10:00:00.000', '2024-12-31 23:59:59.000');

-- INSERT USER`
 INSERT INTO USER VALUES
(1, 'Alice Green', 'https://example.com/images/alice.jpg', '$2b$10$.rPykjLKalwY4DTI2B0yOOQ7ifuy96KvD96inNtAX/X4tzhj9bhXq', 'manishchavan016@gmail.com', 1, 1, NULL, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3),1),
(2, 'Bob Brown', 'https://example.com/images/bob.jpg', 'Test@123#', 'test1@gmail.com', 2, 1,NULL, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3),1),
(3, 'Charlie White', 'https://example.com/images/charlie.jpg', 'Test@123#', 'test2@gmail.com', 4, 1,NULL, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3),1),
(4, 'Diana Black', 'https://example.com/images/diana.jpg', 'Test@123#', 'test3@gmail.com', 8, 1,NULL, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3),1),
(5, 'Edward Blue', 'https://example.com/images/edward.jpg', 'Test@123#', 'test4@gmail.com', 6, 1, NULL, 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3),1);


-- INSERT MEDICINE`
INSERT INTO Medicine (medicine_id, name, description, created_user_id, updated_user_id, created_at, updated_at) VALUES
                                                                                                                    (1, 'Aspirin', 'Used to reduce pain, fever, or inflammation.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (2, 'Ibuprofen', 'Nonsteroidal anti-inflammatory drug.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (3, 'Paracetamol', 'Used to treat fever and mild to moderate pain.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (4, 'Amoxicillin', 'Antibiotic used to treat infections.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (5, 'Ciprofloxacin', 'Antibiotic used to treat a variety of bacterial infections.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (6, 'Metformin', 'Used to treat type 2 diabetes.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (7, 'Lisinopril', 'Used to treat high blood pressure and heart failure.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (8, 'Simvastatin', 'Used to lower cholesterol and triglycerides.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (9, 'Omeprazole', 'Used to treat gastroesophageal reflux disease.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000'),
                                                                                                                    (10, 'Levothyroxine', 'Used to treat hypothyroidism.', 1, 1, '2024-10-30 23:22:12.000', '2024-10-30 23:22:12.000');


-- INSERT MEDICALCONDITION`
INSERT INTO MedicalCondition (condition_id, name, description, type, created_user_id, updated_user_id, created_at, updated_at) VALUES
                                                                                                                                   (1, 'Diabetes', 'A chronic condition that occurs when the body cannot effectively use insulin.', 'Endocrine', 1, 1, '2024-10-30 23:22:17.000', '2024-11-01 02:57:39.839'),
                                                                                                                                   (2, 'Hypertension', 'A condition in which the blood pressure in the arteries is persistently elevated.', 'Cardiovascular', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (3, 'Asthma', 'A condition in which your airways narrow and swell and may produce extra mucus.', 'Respiratory', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (4, 'Cholesterol', 'A waxy substance found in your blood that your body needs to build healthy cells.', 'Metabolic', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (5, 'Arthritis', 'An inflammation of one or more of your joints, causing pain and stiffness.', 'Musculoskeletal', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (6, 'Allergy', 'A condition in which the immune system reacts abnormally to a foreign substance.', 'Immune', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (7, 'Migraine', 'A recurrent throbbing headache that typically affects one side of the head.', 'Neurological', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (8, 'Depression', 'A mood disorder that causes a persistent feeling of sadness and loss of interest.', 'Mental Health', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (9, 'Anxiety', 'A feeling of worry, nervousness, or unease about something with an uncertain outcome.', 'Mental Health', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000'),
                                                                                                                                   (10, 'Obesity', 'A complex disease involving an excessive amount of body fat.', 'Metabolic', 1, 1, '2024-10-30 23:22:17.000', '2024-10-30 23:22:17.000');


-- INSERT TREATMENT`
INSERT INTO Treatment (treatment_id, name, description, cost, duration, type, created_user_id, updated_user_id, created_at, updated_at) VALUES
                                                                                                                                            (1, 'Consultation', 'Initial consultation with the doctor.', 100.0, '30', 'Rehabilitation 1', 1, 1, '2024-10-30 23:21:23.000', '2024-11-01 13:57:08.455'),
                                                                                                                                            (2, 'X-Ray', 'X-ray imaging of the affected area.', 150.0, '15', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (3, 'Blood Test', 'Standard blood test for various health checks.', 80.0, '30', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (4, 'Vaccination', 'Administering vaccines as per schedule.', 50.0, '20', '',1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (5, 'Physiotherapy', 'Physical therapy sessions for rehabilitation.', 120.0, '1', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (6, 'Surgery', 'Surgical procedures performed by qualified surgeons.', 1000.0, '2', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (7, 'Dental Checkup', 'Routine dental examination and cleaning.', 200.0, '1', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (8, 'Nutritional Counseling', 'Consultation for dietary planning.', 90.0, '45', '',1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (9, 'Psychological Assessment', 'Evaluation and therapy sessions.', 300.0, '1', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000'),
                                                                                                                                            (10, 'Chiropractic Treatment', 'Spinal adjustment and therapy.', 130.0, '1', '', 1, 1, '2024-10-30 23:21:23.000', '2024-10-30 23:21:23.000');


-- INSERT CUSTOMER`

INSERT INTO Customer (customer_id, fullname, email, mobile, alt_mobile, address, password, DOB, insurance_policy, created_user_id, updated_user_id, created_at, updated_at) VALUES
                                                                                                                                                                                (1, 'Jane Smith', 'manishchavan016@gmail.com', '1234567890', '0987654321', '123 Main St, Cityville', '123', '1990-01-01 00:00:00.000', 'INS-123456', 1, 1, '2024-10-31 03:15:08.370', '2024-10-31 03:15:08.370'),
                                                                                                                                                                                (2, 'John Doe', 'johndoe@gmail.com', '5551234567', '', '', 'Password1', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (3, 'Jane Smith', 'janesmith@gmail.com', '5552345678', '', '', 'Password2', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (4, 'Alice Johnson', 'alicejohnson@gmail.com', '5553456789', '', '', 'Password3', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (5, 'Michael Brown', 'michaelbrown@gmail.com', '5554567890', '', '', 'Password4', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (6, 'Emily Davis', 'emilydavis@gmail.com', '5555678901', '', '', 'Password5', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (7, 'Daniel Wilson', 'danielwilson@gmail.com', '5556789012', '', '', 'Password6', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (8, 'Sarah Garcia', 'sarahgarcia@gmail.com', '5557890123', '', '', 'Password7', NULL, NULL, 1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (9, 'David Martinez', 'davidmartinez@gmail.com', '5558901234', '', '', 'Password8', NULL, NULL,1, 1, '2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000'),
                                                                                                                                                                                (11, 'James Clark', 'jamesclark@gmail.com', '5550123456', '', '', 'Password10', NULL, NULL, 1, 1,'2024-10-30 23:21:34.000', '2024-10-30 23:21:34.000');


-- INSERT STAFF_MEMBER`

INSERT INTO StaffMember (staff_member_id, fullname, position, qualification, specialization, consultation_fee, email, mobile, alt_mobile, DOB, created_user_id, updated_user_id, created_at, updated_at) VALUES
                                                                                                                                                                                                             (1, 'Dr. Emily Carter', 'Orthopedic Surgeon', 'MD', 'Orthopedics', 200.0, 'emily.carter@hospital.com', '5551234567', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (2, 'Nurse Sarah Johnson', 'Head Nurse', 'BSN', 'Nursing', 60.0, 'sarah.johnson@hospital.com', '5552345678', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (3, 'Dr. Robert Brown', 'Cardiologist', 'MD', 'Cardiology', 250.0, 'robert.brown@hospital.com', '5553456789', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (4, 'Dr. Lisa White', 'Pediatrician', 'MD', 'Pediatrics', 220.0, 'lisa.white@hospital.com', '5554567890', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (5, 'Pharmacist Mark Wilson', 'Pharmacist', 'PharmD', 'Pharmacy', 50.0, 'mark.wilson@hospital.com', '5555678901', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (6, 'Dr. Nancy Green', 'Dermatologist', 'MD', 'Dermatology', 300.0, 'nancy.green@hospital.com', '5556789012', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (7, 'Dr. Daniel Black', 'Neurologist', 'MD', 'Neurology', 275.0, 'daniel.black@hospital.com', '5557890123', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (8, 'Dr. Michelle Lee', 'General Practitioner', 'MD', 'Family Medicine', 150.0, 'michelle.lee@hospital.com', '5558901234', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (9, 'Dr. James Taylor', 'Oncologist', 'MD', 'Oncology', 320.0, 'james.taylor@hospital.com', '5559012345', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000'),
                                                                                                                                                                                                             (10, 'Dr. Laura Martin', 'Gynecologist', 'MD', 'Gynecology', 280.0, 'laura.martin@hospital.com', '5550123456', '', NULL, 1, 1, '2024-10-30 23:21:29.000', '2024-10-30 23:21:29.000');


-- INSERT FEATURES / PAGES`
INSERT INTO FEATURE_MASTER (ID, featureName, backendApi, frontendModule, createdOn, updatedOn) VALUES
                                                                                                   (1, 'Dashboard', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (2, 'User Management', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (3, 'Manage Staff', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (4, 'Manage Customer', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (5, 'Book Appointment', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (6, 'Financial', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (7, 'Master Data', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (15, 'Customers', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (16, 'Case History', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (17, 'Invoices', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (18, 'Expenses Tracker', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (19, 'Medicines', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (20, 'Treatments', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000'),
                                                                                                   (21, 'Medical Condition', 1, 1, '2024-11-11 20:08:36.000', '2024-11-11 20:08:36.000');

-- CRUD Permissions for 'DASHBOARD' feature (FEATURE_ID = 1)

INSERT INTO USER_FEATURE_PERMISSION (ID, USER_TYPE_ID, FEATURE_ID, PERMISSION_ID, createdOn, updatedOn) VALUES
                                                                                                            (1, 1, 1, 1, '2024-11-11 20:08:53.000', '2024-11-11 20:08:53.000'),
                                                                                                            (2, 1, 1, 2, '2024-11-11 20:08:53.000', '2024-11-11 20:08:53.000'),
                                                                                                            (3, 1, 1, 3, '2024-11-11 20:08:53.000', '2024-11-11 20:08:53.000'),
                                                                                                            (4, 1, 1, 4, '2024-11-11 20:08:53.000', '2024-11-11 20:08:53.000'),
                                                                                                            (5, 1, 6, 1, '2024-11-11 20:10:37.000', '2024-11-11 20:10:37.000'),
                                                                                                            (6, 1, 6, 2, '2024-11-11 20:10:37.000', '2024-11-11 20:10:37.000'),
                                                                                                            (7, 1, 6, 3, '2024-11-11 20:10:37.000', '2024-11-11 20:10:37.000'),
                                                                                                            (8, 1, 6, 4, '2024-11-11 20:10:37.000', '2024-11-11 20:10:37.000'),
                                                                                                            (9, 1, 5, 1, '2024-11-11 20:10:40.000', '2024-11-11 20:10:40.000'),
                                                                                                            (10, 1, 5, 2, '2024-11-11 20:10:40.000', '2024-11-11 20:10:40.000'),
                                                                                                            (11, 1, 5, 3, '2024-11-11 20:10:40.000', '2024-11-11 20:10:40.000'),
                                                                                                            (12, 1, 5, 4, '2024-11-11 20:10:40.000', '2024-11-11 20:10:40.000'),
                                                                                                            (13, 1, 5, 1, '2024-11-11 20:10:46.000', '2024-11-11 20:10:46.000'),
                                                                                                            (14, 1, 5, 2, '2024-11-11 20:10:46.000', '2024-11-11 20:10:46.000'),
                                                                                                            (15, 1, 5, 3, '2024-11-11 20:10:46.000', '2024-11-11 20:10:46.000'),
                                                                                                            (16, 1, 5, 4, '2024-11-11 20:10:46.000', '2024-11-11 20:10:46.000'),
                                                                                                            (17, 1, 2, 1, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (18, 1, 2, 2, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (19, 1, 2, 3, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (20, 1, 2, 4, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (21, 1, 3, 1, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (22, 1, 3, 2, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (23, 1, 3, 3, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (24, 1, 3, 4, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (25, 1, 4, 1, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (26, 1, 4, 2, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (27, 1, 4, 3, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (28, 1, 4, 4, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (29, 1, 7, 1, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (30, 1, 7, 2, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (31, 1, 7, 3, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (32, 1, 7, 4, '2024-11-11 20:13:39.000', '2024-11-11 20:13:39.000'),
                                                                                                            (33, 1, 15, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (34, 1, 15, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (35, 1, 15, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (36, 1, 15, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (37, 1, 16, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (38, 1, 16, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (39, 1, 16, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (40, 1, 16, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (41, 1, 17, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (42, 1, 17, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (43, 1, 17, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (44, 1, 17, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (45, 1, 18, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (46, 1, 18, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (47, 1, 18, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (48, 1, 18, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (49, 1, 19, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (50, 1, 19, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (51, 1, 19, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (52, 1, 19, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (53, 1, 20, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (54, 1, 20, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (55, 1, 20, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (56, 1, 20, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (57, 1, 21, 1, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (58, 1, 21, 2, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (59, 1, 21, 3, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000'),
                                                                                                            (60, 1, 21, 4, '2024-11-11 20:48:45.000', '2024-11-11 20:48:45.000');



INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (1, 520, 10500, 210, 1, '2024-01-01 10:00:00.000', '2024-01-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (2, 540, 10800, 220, 1, '2024-02-01 10:00:00.000', '2024-02-29 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (3, 560, 11000, 230, 1, '2024-03-01 10:00:00.000', '2024-03-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (4, 580, 11500, 240, 1, '2024-04-01 10:00:00.000', '2024-04-30 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (5, 600, 12000, 250, 1, '2024-05-01 10:00:00.000', '2024-05-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (6, 620, 12200, 260, 1, '2024-06-01 10:00:00.000', '2024-06-30 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (7, 580, 11700, 240, 1, '2024-07-01 10:00:00.000', '2024-07-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (8, 590, 11900, 245, 1, '2024-08-01 10:00:00.000', '2024-08-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (9, 610, 12100, 255, 1, '2024-09-01 10:00:00.000', '2024-09-30 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (10, 620, 12500, 265, 1, '2024-10-01 10:00:00.000', '2024-10-31 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (11, 640, 13000, 275, 1, '2024-11-01 10:00:00.000', '2024-11-30 23:59:59.000');
INSERT INTO onehealth.ORGANIZATION_DASHBOARD (id, monthlyActiveUsers, monthlyRevenue, monthlySales, org_id, createdOn, updatedOn) VALUES (12, 660, 13500, 280, 1, '2024-12-01 10:00:00.000', '2024-12-31 23:59:59.000');
