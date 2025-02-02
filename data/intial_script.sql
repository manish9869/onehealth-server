-- CREATE A SCRIPT FOR INSERTING THE ROLES IN

-- Insert Permissions
INSERT INTO PERMISSION_MASTER (Name, Code) VALUES 
('Create', 'CREATE'),
('Read', 'READ'),
('Update', 'UPDATE'),
('Delete', 'DELETE');

-- Insert Roles
INSERT INTO USER_TYPE_MASTER (NAME) VALUES 
('SUPER ADMIN'),
('ADMIN'),
('DOCTOR'),
('PATIENT'),
('STAFF');


-- INSERT FEATURES`
INSERT INTO FEATURE_MASTER (ID, featureName, backendApi, frontendModule, createdOn, updatedOn)
VALUES 
    (1, 'Dashboard', true, true, NOW(), NOW()),
    (2, 'User Management', true, true, NOW(), NOW()),
    (3, 'Manage Staff', true, true, NOW(), NOW()),
    (4, 'Manage Customer', true, true, NOW(), NOW()),
    (5, 'Book Appointment', true, true, NOW(), NOW()),
    (6, 'Financial', true, true, NOW(), NOW()),
    (7, 'Master Data', true, true, NOW(), NOW());


-- USER_TYPE_ID for 'PATIENT' is assumed to be 1
-- Permissions:
-- 1 - Create, 2 - Read, 3 - Update, 4 - Delete

-- CRUD Permissions for 'DASHBOARD' feature (FEATURE_ID = 1)
INSERT INTO USER_FEATURE_PERMISSION (USER_TYPE_ID, FEATURE_ID, PERMISSION_ID, createdOn, updatedOn)
VALUES
    (1, 1, 1, NOW(), NOW()),  -- Create
    (1, 1, 2, NOW(), NOW()),  -- Read
    (1, 1, 3, NOW(), NOW()),  -- Update
    (1, 1, 4, NOW(), NOW());  -- Delete

-- CRUD Permissions for 'BOOK APPOINTMENT' feature (FEATURE_ID = 5)
INSERT INTO USER_FEATURE_PERMISSION (USER_TYPE_ID, FEATURE_ID, PERMISSION_ID, createdOn, updatedOn)
VALUES
    (1, 5, 1, NOW(), NOW()),  -- Create
    (1, 5, 2, NOW(), NOW()),  -- Read
    (1, 5, 3, NOW(), NOW()),  -- Update
    (1, 5, 4, NOW(), NOW());  -- Delete

-- CRUD Permissions for 'FINANCIAL' feature (FEATURE_ID = 6)
INSERT INTO USER_FEATURE_PERMISSION (USER_TYPE_ID, FEATURE_ID, PERMISSION_ID, createdOn, updatedOn)
VALUES
    (1, 6, 1, NOW(), NOW()),  -- Create
    (1, 6, 2, NOW(), NOW()),  -- Read
    (1, 6, 3, NOW(), NOW()),  -- Update
    (1, 6, 4, NOW(), NOW());  -- Delete

-- CRUD Permissions for 'MASTER DATA' feature (FEATURE_ID = 7)
INSERT INTO USER_FEATURE_PERMISSION (USER_TYPE_ID, FEATURE_ID, PERMISSION_ID, createdOn, updatedOn)
VALUES
    (1, 7, 1, NOW(), NOW()),  -- Create
    (1, 7, 2, NOW(), NOW()),  -- Read
    (1, 7, 3, NOW(), NOW()),  -- Update
    (1, 7, 4, NOW(), NOW());  -- Delete




