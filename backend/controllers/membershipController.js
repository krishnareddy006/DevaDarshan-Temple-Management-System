import { getMembershipCollection } from "../config/database.js";
import { transporter, EMAIL_USER } from "../config/email.js";
import { ObjectId } from "mongodb";

// Membership pricing
const MEMBERSHIP_PRICES = {
  basic: 4000,
  premium: 7000,
  patron: 10000,
};

// Submit membership application
const submitMembership = async (req, res) => {
  try {
    const { fullName, email, phone, membershipType } = req.body;

    if (!fullName || !email || !phone || !membershipType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!MEMBERSHIP_PRICES[membershipType]) {
      return res.status(400).json({ message: "Invalid membership type" });
    }

    const membershipCollection = getMembershipCollection();
    
    // Check if email already exists with pending or approved status
    const existingMember = await membershipCollection.findOne({ 
      email,
      status: { $in: ["pending", "approved"] }
    });

    if (existingMember) {
      return res.status(400).json({ 
        message: "A membership application with this email already exists" 
      });
    }

    const result = await membershipCollection.insertOne({
      fullName,
      email,
      phone,
      membershipType,
      amount: MEMBERSHIP_PRICES[membershipType],
      status: "pending",
      createdAt: new Date(),
    });


    // Send acknowledgment email to applicant
    const mailOptions = {
      from: `"Shiva Temple" <${EMAIL_USER}>`,
      to: email,
      subject: "Membership Application Received - Pending Approval",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
            .details { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Membership Application Received</h1>
            </div>
            <div class="content">
              <p>Dear ${fullName},</p>
              
              <p>Thank you for your interest in joining the Shiva Temple community! We have received your membership application.</p>
              
              <div class="details">
                <h3>Application Details:</h3>
                <p><strong>Membership Type:</strong> ${membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Membership</p>
                <p><strong>Amount:</strong> ₹${MEMBERSHIP_PRICES[membershipType].toLocaleString()}/year</p>
                <p><strong>Status:</strong> Pending Admin Approval</p>
              </div>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our admin team will review your application</li>
                <li>You will receive a confirmation email once approved</li>
                <li>The approval process typically takes 24-48 hours</li>
              </ul>
              
              <p>If you have any questions, please feel free to contact us.</p>
              
              <p>With blessings,<br><strong>Shiva Temple Administration</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>© ${new Date().getFullYear()} Shiva Temple. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      message: "Membership application submitted successfully", 
      id: result.insertedId 
    });
  } catch (err) {
    console.error("❌ Error submitting membership:", err);
    res.status(500).json({ message: "Failed to submit membership application" });
  }
};

// Get all memberships (admin only)
const getAllMemberships = async (req, res) => {
  try {
    const membershipCollection = getMembershipCollection();
    const memberships = await membershipCollection.find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).json(memberships);
  } catch (err) {
    console.error("❌ Error fetching memberships:", err);
    res.status(500).json({ message: "Failed to fetch memberships" });
  }
};

// Approve membership
const approveMembership = async (req, res) => {
  try {
    const { id } = req.params;
    
    const membershipCollection = getMembershipCollection();
    
    const membership = await membershipCollection.findOne({ _id: new ObjectId(id) });
    
    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    if (membership.status === "approved") {
      return res.status(400).json({ message: "Membership already approved" });
    }

    await membershipCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: "approved",
          approvedAt: new Date()
        }
      }
    );


    // Send approval email
    const mailOptions = {
      from: `"Shiva Temple" <${EMAIL_USER}>`,
      to: membership.email,
      subject: "Membership Approved - Welcome to Shiva Temple Community!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #16a34a, #22c55e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
            .success-box { background: #d1fae5; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 6px; }
            .details { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Congratulations!</h1>
              <h2>Your Membership is Approved</h2>
            </div>
            <div class="content">
              <p>Dear ${membership.fullName},</p>
              
              <div class="success-box">
                <h3 style="color: #16a34a; margin-top: 0;">✓ Membership Approved Successfully</h3>
                <p>Welcome to the Shiva Temple spiritual community! Your ${membership.membershipType} membership has been approved.</p>
              </div>
              
              <div class="details">
                <h3>Membership Details:</h3>
                <p><strong>Member Name:</strong> ${membership.fullName}</p>
                <p><strong>Membership Type:</strong> ${membership.membershipType.charAt(0).toUpperCase() + membership.membershipType.slice(1)} Membership</p>
                <p><strong>Annual Fee:</strong> ₹${membership.amount.toLocaleString()}</p>
                <p><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">Active</span></p>
              </div>
              
              <p><strong>Your Benefits:</strong></p>
              <ul>
                <li>Access to exclusive temple events and festivals</li>
                <li>Priority darshan bookings</li>
                <li>Participation in community service activities</li>
                <li>Monthly spiritual newsletters</li>
                <li>Special discounts on temple services</li>
              </ul>
              
              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Visit the temple office to collect your membership card</li>
                <li>Bring a valid ID proof for verification</li>
                <li>Complete the payment process at the counter</li>
              </ol>
              
              <p>Thank you for becoming a valued member of our spiritual family. May your journey with us be filled with peace, prosperity, and divine blessings.</p>
              
              <p>Om Namah Shivaya 🙏</p>
              
              <p>With divine blessings,<br><strong>Shiva Temple Administration</strong></p>
            </div>
            <div class="footer">
              <p>For any queries, please contact us at the temple office or reply to this email.</p>
              <p>© ${new Date().getFullYear()} Shiva Temple. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Membership approved successfully" });
  } catch (err) {
    console.error("❌ Error approving membership:", err);
    res.status(500).json({ message: "Failed to approve membership" });
  }
};

export {
  submitMembership,
  getAllMemberships,
  approveMembership
};
