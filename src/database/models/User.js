import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const generateUniqueUsername = async function(baseUsername) {
  let username = baseUsername;
  let counter = 1;
  while (await this.constructor.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }
  return username;
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      minlength: 6,
      select: false, // Don't return password in queries
      required: function () {
        return !this.isGoogleUser;
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'], // Allowed values
      default: 'prefer-not-to-say',
    },
    dateOfBirth: {
      type: Date,
    },
    address: {
      type: String,
    },
    city:{
      type: String,
      default:'',
    },
    state:{
      type: String,
      default:'',
    },
    zipCode:{
      type: String,
      default:'',
    },
    country:{
      type: String,
      default:'',
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values (for traditional auth users)
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    authType: {
      type: String,
      enum: ['local', 'google', 'both'],
      default: 'local'
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: function() {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.username)}&background=random`;
      }
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    isDeliveryPartner: {
      type: Boolean,
      default: false,
    },
    partnerDetails: {
      approved: {
        type: Boolean,
        default: false,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
      totalDeliveries: {
        type: Number,
        default: 0,
      },
      totalEarnings: {
        type: Number,
        default: 0,
      },
    },
    vehicles:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
      }
    ],
    // Add verification documents
    verificationStatus: {
      type: String,
      enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'],
      default: 'Not Submitted'
    },
    verificationDocuments: {
      governmentId: {
        path: String,
        uploadedAt: Date,
        status: {
          type: String,
          enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'],
          default: 'Not Submitted'
        }
      },
      proofOfAddress: {
        path: String,
        uploadedAt: Date,
        status: {
          type: String,
          enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'],
          default: 'Not Submitted'
        }
      },
      proofOfInsurance: {
        path: String,
        uploadedAt: Date,
        status: {
          type: String,
          enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'],
          default: 'Not Submitted'
        }
      },
      backgroundCheckConsent: {
        path: String,
        uploadedAt: Date,
        status: {
          type: String,
          enum: ['Not Submitted', 'Pending', 'Approved', 'Rejected'],
          default: 'Not Submitted'
        }
      }
    },
  },
  { timestamps: true }
);

// Add method to check verification status
UserSchema.methods.checkVerificationStatus = async function() {
  const docs = this.verificationDocuments;
  const allDocsSubmitted = docs.governmentId.path && 
                         docs.proofOfAddress.path && 
                         docs.proofOfInsurance.path && 
                         docs.backgroundCheckConsent.path;
                         
  const allDocsApproved = docs.governmentId.status === 'Approved' && 
                        docs.proofOfAddress.status === 'Approved' && 
                        docs.proofOfInsurance.status === 'Approved' && 
                        docs.backgroundCheckConsent.status === 'Approved';
                        
  if (allDocsSubmitted && allDocsApproved) {
    this.partnerDetails.approved = true;
    this.verificationStatus = 'Approved';
  } else if (allDocsSubmitted && !allDocsApproved) {
    this.verificationStatus = 'Pending';
  }
  
  return this.save();
};

const getHighQualityPicture = (url) => {
  if (!url) return null;
  return url.replace('=s96-c', '=s400-c');
};

// Update the UserSchema pre-save middleware
UserSchema.pre('save', async function(next) {
  try {
    // Handle username uniqueness for new Google users
    if (this.isNew && this.isGoogleUser) {
      this.username = await generateUniqueUsername.call(this, this.username);
    }

    if (this.isModified('profilePicture') && this.isGoogleUser) {
      this.profilePicture = getHighQualityPicture(this.profilePicture);
    }

    // Handle password hashing
    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with stored password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;