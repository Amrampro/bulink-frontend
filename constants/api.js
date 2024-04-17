const ip1 = "http://10.2.101.113:8089"
const ip2 = "http://192.168.1.36:8089"

const host = ip2

// const host = "http://192.168.1.36:8089"

const API = {

    // Authentication
    // Login
    login: host + "/api/auth/signin",
    signup: host + "/api/auth/signup",
    signout: host + "/api/auth/signout",

    // for client
    // GET All
    clientReadAll_Admin: host + "/api/contacts/clients",
    // GET Single
    clientSingle: host + "/api/contacts",
    // CREATE Single
    clientCreate: host + "/api/contacts",

    companyReadAll_Admin: host + "/api/contacts/companies",
    employeeReadAll_Admin: host + "/api/contacts/employees",
    othersReadAll_Admin: host + "/api/contacts/others",

    // ROUTE FOR USERS CONTACTS
    companyReadAll: host + "/api/contacts/companiesFSU",
    employeeReadAll: host + "/api/contacts/employeesFSU",
    othersReadAll: host + "/api/contacts/othersFSU",
    clientReadAll: host + "/api/contacts/clientsFSU",

    // SingleUserContacts
    singleUserContacts: host + "/api/contacts/user",

    // ------------------- FOR REMINDERS ----------------
    reminderCreate: host + "/api/reminders",
    reminderDelete: host + "/api/reminders",
    reminderReadAll: host + "/api/reminders",
    reminderReadSingle: host + "/api/reminders",
    reminderSingleUser: host + "/api/reminders/user", // GET method

//     -------------------- FOR ORGANIZATIONS ----------------
    organizationReadAll: host + "/api/organizations",
    organizationReadAllFSU: host + "/api/organizations/user",

//    --------------------- Export user contacts --------------------
    exportCsv: host + "/api/contacts/csvexport",

//     -------------------- FOR SINGLE USER -----------------
    getUser: host + "/api/users"
}

export default API;