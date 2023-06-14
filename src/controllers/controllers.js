
// starts here save add/save contact- author kelvin
export const newContact = async (req, res) => {
    try {
        const { fullname, mobilenumber, homeaddress, worknumber, email, groupid } =
            req.body;
        const query =
            "INSERT INTO contacts (fullname, mobilenumber, worknumber, homeaddress, email, groupid) VALUES (@fullname, @mobilenumber, @worknumber, @homeaddress, @email,@groupid)";
        const connection = await sql.connect(dbConfig);
        await connection
            .request()
            .input("fullname", sql.VarChar, fullname)
            .input("mobilenumber", sql.VarChar, mobilenumber)
            .input("worknumber", sql.VarChar, worknumber)
            .input("homeaddress", sql.VarChar, homeaddress)
            .input("email", sql.VarChar, email)
            .input("groupid", sql.VarChar, groupid)
            .query(query);
        res.json({ message: "Contact created successfully" });
    } catch (error) {
        res.json(error.message);
    } finally {
        sql.close();
    }
};
//ends here



//  UPDATING CONTACT 
// Starts here
export const updateContact = async (req, res) => {
    try {
        const { fullname, mobilenumber, homeaddress, worknumber, email, groupid } =
            req.body;
        const query =
            "UPDATE contacts SET fullname = @fullname,mobilenumber =   @mobilenumber,worknumber =  @worknumber,homeaddress = @homeaddress, email= @email,groupid = @groupid";
        const connection = await sql.connect(dbConfig);
        await connection
            .request()
            .input("fullname", sql.VarChar, fullname)
            .input("mobilenumber", sql.VarChar, mobilenumber)
            .input("worknumber", sql.VarChar, worknumber)
            .input("homeaddress", sql.VarChar, homeaddress)
            .input("email", sql.VarChar, email)
            .input("groupid", sql.VarChar, groupid)
            .query(query);
        res.json({ message: "Contact updated successfully" });
    } catch (error) {
        res.json(error.message);
    } finally {
        sql.close();
    }
};
// ends here 