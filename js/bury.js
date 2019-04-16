var firebaseConfig = {
  apiKey: "AIzaSyDNwXooTh0URLihSpXCaJKG52riq3PYwqo",
  authDomain: "time-capsule-12424.firebaseapp.com",
  databaseURL: "https://time-capsule-12424.firebaseio.com",
  projectId: "time-capsule-12424",
  storageBucket: "time-capsule-12424.appspot.com",
  messagingSenderId: "914523788031"
};

var timeCapsule = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(timeCapsule);
var storage = firebase.storage();


function Capsule(name, duration) {
  this.name = name;
  this.uid = uuidv4();
  this.media = ["document1", "document2", "document3"];
  this.duration = duration;
}

var d = new Date();
var n = d.getTime();
var firstCapsule = new Capsule("Capsule#2318", 0);

var storageRef = firebase.storage().ref();

var metadata = {
  contentType: 'image/jpeg'
};


var fileList = [];


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


function updateFileList() {
  var output = [];
  for (var i = 0, f; f = fileList[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');
  }
  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}


function uploadFiles() {
  for (var i = 0, f; f = fileList[i]; i++) {
    storageRef.child(firstCapsule.uid + "/" + f.name).put(f);
  }
  var timeBuried = d.getTime();
  db.collection("capsules").doc(firstCapsule.uid).set({
    name: firstCapsule.name,
    timeCreated: timeBuried,
    duration: firstCapsule.duration,
    media: firstCapsule.media
  });

}



function addEventHandlers() {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  $('#upload').on('click', function () {
    uploadFiles();

  });
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  for (var i = 0; i < evt.target.files.length; i++) {
    fileList.push(evt.target.files[i])
  }
  //mountainsRef.put(evt.target.files[0]);
  updateFileList();
}


$(function() {
  addEventHandlers()

});