// Mutiara Connect – sample data shared by every page (Part A prototype).
// In Part B these lists come from the database instead.

var STATIONS = [
  ['A01', 'PSR-A (Silicon Island)'], ['S02', 'Permatang Damar Laut'], ['S03', 'Penang International Airport'],
  ['S04', 'Sungai Tiram'], ['S05', 'FIZ South'], ['S06', 'FIZ North'], ['S07', 'Jalan Tengah'], ['S08', 'SPICE'],
  ['S09', 'Bukit Jambul'], ['S10', 'Sungai Nibong'], ['S11', 'Sungai Dua'], ['S12', 'Batu Uban'],
  ['S13', 'Jalan Universiti'], ['S14', 'Gelugor'], ['S15', 'Penang Waterfront'], ['S16', 'East Jelutong'],
  ['S17', 'Sungai Pinang'], ['S18', 'Bandar Sri Pinang'], ['S19', 'Macallum'], ['S20', 'KOMTAR'], ['S31', 'Penang Sentral']
];

function stationName(code) {
  for (var i = 0; i < STATIONS.length; i++) if (STATIONS[i][0] === code) return code + ' ' + STATIONS[i][1];
  return code;
}

// Notice types: closure = partial road closure, lane = lane closure, walk = pedestrian diversion
var TYPE_LABEL = { closure: 'Partial road closure', lane: 'Lane closure', walk: 'Pedestrian diversion', works: 'Construction works' };

var ROADS = {
  'sultan-azlan-shah': 'Jalan Sultan Azlan Shah',
  'jalan-tengah': 'Jalan Tengah',
  'tun-dr-awang': 'Jalan Tun Dr Awang',
  'lim-chong-eu': 'Lim Chong Eu Expressway'
};

// The six live notices (same as the homepage). x / y place the marker on the alignment map (percent).
var NOTICES = [
  { id: 'n1', type: 'closure', road: 'sultan-azlan-shah', stations: ['S13', 'S14'], x: 53, y: 40,
    title: 'Night closures on Jalan Sultan Azlan Shah, Sunny Point junction to USM field',
    start: '2026-11-13', end: '2027-01-31', dates: '13 Nov 2026 to 31 Jan 2027', hours: '10.00 pm to 5.00 am', night: true,
    work: 'Tree felling', by: 'contractor',
    means: 'One carriageway closed each night. Expect 10 to 15 minutes extra on the approach to USM.',
    detour: ['Turn left at Sunny Point junction onto Jalan Tun Dr Awang.', 'Continue to the USM Main Gate roundabout.', 'Rejoin Jalan Sultan Azlan Shah after the USM field.'] },
  { id: 'n2', type: 'lane', road: 'sultan-azlan-shah', stations: ['S14'], x: 54, y: 35,
    title: 'Short-term night lane closure on Jalan Sultan Azlan Shah near Gelugor',
    start: '2026-11-16', end: '2026-11-20', dates: '16 to 20 Nov 2026', hours: '10.00 pm to 5.00 am', night: true,
    work: 'Tree cutting', by: 'police',
    means: 'Left lane closed. Traffic marshals guide vehicles past the work zone.',
    detour: ['Keep right and follow the cones past the work zone.', 'No turn-offs are blocked. Slow to 30 km/h.'] },
  { id: 'n3', type: 'lane', road: 'jalan-tengah', stations: ['S07'], x: 28, y: 65.5,
    title: 'Daytime lane closures on Jalan Tengah, between the Jalan Tengah apartments and Bayan Baru fire station',
    start: '2026-11-09', end: '2027-01-31', dates: '9 Nov 2026 to 31 Jan 2027', hours: '9.00 am to 5.00 pm', night: false,
    work: 'Road widening and drain diversion', by: 'contractor',
    means: 'One lane in each direction closed. Delays at school hours.',
    detour: ['Use Lebuh Bukit Kecil as the alternative route to Bayan Baru.', 'Return to Jalan Tengah at the fire station junction.'] },
  { id: 'n4', type: 'closure', road: 'sultan-azlan-shah', stations: ['S06'], x: 33.5, y: 70.5,
    title: 'Night closures in stages between the Jalan Tengah apartments and the Snake Temple',
    start: '2026-11-09', end: '2027-01-31', dates: '9 Nov 2026 to 31 Jan 2027', hours: '10.00 pm to 5.00 am', night: true,
    work: 'Early utility works', by: 'contractor',
    means: 'Closed in short stages. Each stage is posted two days ahead.',
    detour: ['Follow signs onto the service road behind the Snake Temple.', 'Return to the main road after the closed stage.'] },
  { id: 'n5', type: 'walk', road: 'tun-dr-awang', stations: ['S09'], x: 35.5, y: 60,
    title: 'Footpath moved to the opposite side of Jalan Tun Dr Awang near Bukit Jambul',
    start: '2026-11-02', end: '2026-12-18', dates: '2 Nov to 18 Dec 2026', hours: 'All day', night: false,
    work: 'Pier foundation works', by: 'contractor',
    means: 'The usual footpath is fenced off. A signed crossing with a signal leads to the temporary footpath.',
    detour: ['Use the signalised crossing 40 m before the fence.', 'Walk on the temporary footpath, about 1.5 m wide and level.', 'Cross back at the second signal to return to the original path.'] },
  { id: 'n6', type: 'lane', road: 'lim-chong-eu', stations: ['S15'], x: 58, y: 30,
    title: 'Left lane closed on Lim Chong Eu Expressway, northbound near Penang Waterfront',
    start: '2026-11-01', end: '2026-12-30', dates: '1 Nov to 30 Dec 2026', hours: '11.00 pm to 5.00 am', night: true,
    work: 'Utility relocation', by: 'police',
    means: 'Northbound left lane closed overnight. Two lanes stay open.',
    detour: ['Keep to the middle and right lanes.', 'Exit at Penang Waterfront if you need local roads.'] }
];

// Planned works for the Works Schedule: the six notices plus four works without a road closure.
var WORKS = NOTICES.map(function (n) {
  return { title: n.title, short: n.title.split(',')[0], type: n.type, station: n.stations[0], start: n.start, end: n.end, hours: n.hours, night: n.night, work: n.work, link: 'closures.html#' + n.id };
}).concat([
  { title: 'Night piling for the Sungai Nibong station foundation', short: 'Night piling, Sungai Nibong', type: 'works', station: 'S10', start: '2026-11-20', end: '2026-12-31', hours: '10.00 pm to 2.00 am', night: true, work: 'Bored piling (noisy)' },
  { title: 'Girder lifting over Jalan Sultan Azlan Shah at Jalan Universiti', short: 'Girder lifting, Jalan Universiti', type: 'works', station: 'S13', start: '2026-11-28', end: '2026-11-30', hours: '11.00 pm to 5.00 am', night: true, work: 'Crane lifting (road closed during lifts)' },
  { title: 'Soil investigation at the Bandar Sri Pinang station site', short: 'Soil tests, Bandar Sri Pinang', type: 'works', station: 'S18', start: '2026-12-07', end: '2026-12-18', hours: '9.00 am to 5.00 pm', night: false, work: 'Drilling and sampling' },
  { title: 'Hoarding installation along Jalan Sultan Azlan Shah, Batu Uban', short: 'Hoarding, Batu Uban', type: 'works', station: 'S12', start: '2026-11-23', end: '2026-12-04', hours: '9.00 am to 6.00 pm', night: false, work: 'Site hoarding' }
]);

// Business premises near the works (F2)
var PREMISES = [
  { name: 'Kedai Runcit Pak Din', kind: 'Grocery', road: 'Jalan Sultan Azlan Shah, Gelugor', station: 'S14', status: 'open', state: 'Front entrance open.', note: 'Deliveries 7 am to 7 pm. No change.', notice: 'n1' },
  { name: 'Restoran Sri Gelugor', kind: 'Restaurant', road: 'Jalan Sultan Azlan Shah, Gelugor', station: 'S14', status: 'limited', state: 'Frontage partly blocked by hoarding at night.', entrance: 'Use the left side door, 3 m from the main entrance.', note: 'Night deliveries paused 10 pm to 5 am.', notice: 'n2' },
  { name: 'Klinik Kesihatan Universiti', kind: 'Clinic', road: 'Jalan Universiti', station: 'S13', status: 'open', state: 'Open as normal. Ambulance bay kept clear.', note: 'Patients may drop off at the front bay.', notice: 'n1' },
  { name: 'Kopitiam Bayan Baru', kind: 'Cafe', road: 'Jalan Tengah, Bayan Baru', station: 'S07', status: 'alternative', state: 'Front footpath closed in the daytime.', entrance: 'Enter from the back lane next to the fire station.', note: 'Deliveries via the back lane before 9 am.', notice: 'n3' },
  { name: 'Farmasi Sihat', kind: 'Pharmacy', road: 'Jalan Tengah, Bayan Baru', station: 'S07', status: 'limited', state: 'One lane closed. Short parking only.', entrance: 'Park at the Bayan Baru fire station lot and walk 80 m.', note: 'Small vans only from 5 pm.', notice: 'n3' },
  { name: 'Kedai Buku Jambul', kind: 'Bookshop', road: 'Jalan Tun Dr Awang, Bukit Jambul', station: 'S09', status: 'alternative', state: 'Usual footpath fenced off.', entrance: 'Cross at the signal, then use the temporary footpath.', note: 'Deliveries to the side gate.', notice: 'n5' },
  { name: 'Warung Kak Ani', kind: 'Stall', road: 'Jalan Tun Dr Awang, Bukit Jambul', station: 'S09', status: 'open', state: 'Open. Stall moved 5 m north.', note: 'Same as before.', notice: 'n5' },
  { name: 'Bengkel Snake Temple Road', kind: 'Workshop', road: 'Near the Snake Temple', station: 'S06', status: 'limited', state: 'Staged night closures affect evening trade.', entrance: 'Use the service road behind the temple after 10 pm.', note: 'Daytime deliveries only.', notice: 'n4' }
];
var ACCESS_LABEL = { open: 'Open', limited: 'Limited', alternative: 'Alternative entrance' };

// Complaints. "to" = which authority it was forwarded to.
var COMPLAINTS = [
  { id: 'MC-2026-04817', concern: 'Noise at night', text: 'Night-time noise from utility works near the Snake Temple', by: 'Aisyah R.', road: 'Jalan Sultan Azlan Shah', station: 'S14', status: 'action', forwarded: '9 Nov 2026', due: 'Replied', updated: '12 Nov 2026, 10.15 am', to: 'contractor',
    history: [['Received', '8 Nov 2026, 11.40 pm'], ['Forwarded', '9 Nov 2026, 9.05 am'], ['In action', '12 Nov 2026, 10.15 am']],
    response: 'Thank you for your report. Noisy cutting will stop by 11.00 pm from 13 Nov, and quieter equipment is being used after that. Contractor site team, FIZ North.' },
  { id: 'MC-2026-04620', concern: 'Blocked access', text: 'Temporary footpath near Bukit Jambul has no ramp for wheelchairs', by: 'Aisyah R.', road: 'Jalan Tun Dr Awang', station: 'S09', status: 'resolved', forwarded: '3 Nov 2026', due: 'Replied', updated: '9 Nov 2026, 4.30 pm', to: 'government',
    history: [['Received', '2 Nov 2026, 6.10 pm'], ['Forwarded', '3 Nov 2026, 8.50 am'], ['In action', '5 Nov 2026, 2.00 pm'], ['Resolved', '9 Nov 2026, 4.30 pm']],
    response: 'A ramp and handrail were added at both ends of the temporary footpath on 9 Nov. Please report again if anything is still hard to use. Penang State Government.' },
  { id: 'MC-2026-04398', concern: 'Road closure', text: 'No advance warning sign before the lane closure on Lim Chong Eu Expressway', by: 'Aisyah R.', road: 'Lim Chong Eu Expressway', station: 'S15', status: 'forwarded', forwarded: '12 Nov 2026', due: 'In 3 days', updated: '12 Nov 2026, 9.30 am', to: 'police',
    history: [['Received', '11 Nov 2026, 10.20 pm'], ['Forwarded', '12 Nov 2026, 9.30 am']], response: '' },
  { id: 'MC-2026-04790', concern: 'Damaged road', text: 'Potholes on the lane next to the works zone', by: 'Tan K. L.', road: 'Lim Chong Eu Expressway', station: 'S15', status: 'forwarded', forwarded: '3 Nov 2026', due: 'Overdue 7 days', overdue: true, to: 'contractor', history: [], response: '' },
  { id: 'MC-2026-04822', concern: 'Dust', text: 'Dust from the drain works covers the shop fronts', by: 'Lim S. Y.', road: 'Jalan Tengah', station: 'S07', status: 'forwarded', forwarded: '10 Nov 2026', due: 'Due today', soon: true, to: 'contractor', history: [], response: '' },
  { id: 'MC-2026-04835', concern: 'Blocked entrance', text: 'Hoarding blocks the side gate of the bookshop', by: 'Muthu S.', road: 'Jalan Tun Dr Awang', station: 'S09', status: 'forwarded', forwarded: '12 Nov 2026', due: 'In 2 days', to: 'contractor', history: [], response: '' },
  { id: 'MC-2026-04841', concern: 'Wrong detour sign', text: 'Detour sign at Sunny Point points into a one-way road', by: 'Ravi P.', road: 'Jalan Sultan Azlan Shah', station: 'S13', status: 'forwarded', forwarded: '13 Nov 2026', due: 'In 3 days', to: 'police', history: [], response: '' },
  { id: 'MC-2026-04802', concern: 'Business impact', text: 'Night closures have cut evening customers by half', by: 'Ong B. H.', road: 'Near the Snake Temple', station: 'S06', status: 'forwarded', forwarded: '11 Nov 2026', due: 'In 1 day', to: 'government', history: [], response: '' },
  { id: 'MC-2026-04760', concern: 'Noise at night', text: 'Piling noise after midnight near the apartments', by: 'Nurul H.', road: 'Jalan Tengah', station: 'S07', status: 'resolved', forwarded: '1 Nov 2026', due: 'Replied', to: 'contractor', history: [], response: 'Piling now ends at 11.00 pm.' }
];
var STATUS_LABEL = { received: 'Received', forwarded: 'Forwarded', action: 'In action', resolved: 'Resolved' };

// The three authorities that can sign in to the Authority Portal
var AUTHORITIES = {
  contractor: { initials: 'CT', name: 'Mutiara Line Contractor', sub: 'Contractor · Site team, Gelugor to Bukit Jambul', label: 'Contractor' },
  police: { initials: 'SP', name: 'Penang State Police, Traffic Branch', sub: 'State Police · Road closures and diversions', label: 'State Police' },
  government: { initials: 'SG', name: 'Penang State Government', sub: 'State Government · Public complaints unit', label: 'State Government' }
};

// Saved reports from the Report a Concern form (kept for this browser only).
function savedReports() {
  try { return JSON.parse(localStorage.getItem('mc-reports') || '[]'); } catch (e) { return []; }
}
function saveReport(r) {
  try { var list = savedReports(); list.unshift(r); localStorage.setItem('mc-reports', JSON.stringify(list)); } catch (e) { /* storage blocked: the ticket still shows on screen */ }
}
