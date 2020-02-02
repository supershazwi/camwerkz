InvoiceNeedingUpdate = new Mongo.Collection('invoiceNeedingUpdate');



Meteor.methods({
  checkInvoiceNeedingUpdate: function(bookingId) {
    this.unblock();
  	if(InvoiceNeedingUpdate.findOne({bookingId: bookingId}) == undefined) {
  		var invoiceNeedingUpdate = InvoiceNeedingUpdate.insert({
			bookingId: bookingId,
      customerIdd: "0",
      voidId:"0"
		});
  	}
  },
  checkInvoiceNeedingUpdateVoid: function(bookingId) {
    this.unblock();
    var ivnu = InvoiceNeedingUpdate.findOne({bookingId: bookingId});

    if(ivnu != undefined) {

      ivnu.voidId = bookingId;
      ivnu.bookingId = "0";

      InvoiceNeedingUpdate.update({bookingId: bookingId}, {$set: ivnu});
    } else {
      InvoiceNeedingUpdate.insert({
        bookingId: "0",
        voidId: bookingId,
        customerIdd: "0"
      });
    }
  },
  checkCustomerNeedingUpdate: function(customerIdd) {
    this.unblock();
    if(InvoiceNeedingUpdate.findOne({customerIdd: customerIdd}) == undefined) {
      var invoiceNeedingUpdate = InvoiceNeedingUpdate.insert({
        bookingId: "0",
        customerIdd: customerIdd,
        voidId: "0"
      });
    }
  },
  checkOtherInvoiceNeedingUpdate: function(otherId) {
    this.unblock();
  	if(InvoiceNeedingUpdate.findOne({otherId: otherId}) == undefined) {
  		var invoiceNeedingUpdate = InvoiceNeedingUpdate.insert({
			otherId: otherId
		});
  	}
  }
});