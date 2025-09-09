# 🛠️ Network Troubleshooting Guide (Red Hat / CentOS)

## 📌 مقدمة
هذا الملف يحتوي على خطوات عملية + أوامر أساسية لتشخيص وحل مشاكل الشبكات على أنظمة Red Hat / CentOS.  
الفكرة إنك تبدأ من **الأسهل → الأعقد** (Physical → Routing → Firewall → Service).

---

## ✅ خطوات منهجية لحل المشاكل

| المرحلة | الهدف | الأمر/الخطوة |
|---------|-------|---------------|
| 1 | التأكد من الـ NIC (كارت الشبكة) | `ip addr` <br> `nmcli device status` |
| 2 | اختبار السيرفر نفسه | `ping 127.0.0.1` <br> `ping <Server_IP>` |
| 3 | اختبار الوصول للشبكة الداخلية | `ping <Gateway_IP>` |
| 4 | اختبار الإنترنت بالـ IP | `ping 8.8.8.8` |
| 5 | اختبار الإنترنت بالـ DNS | `ping google.com` <br> تحقق من `/etc/resolv.conf` |
| 6 | التحقق من Routing | `ip route` <br> أضف Gateway عند الحاجة: `ip route add default via <Gateway_IP>` |
| 7 | التحقق من Firewall | `firewall-cmd --state` <br> `firewall-cmd --list-all` |
| 8 | التحقق من SELinux | `getenforce` <br> تعطيل مؤقت: `setenforce 0` |
| 9 | التحقق من البورتات | `ss -tuln` أو `netstat -tulnp` |
| 10 | التحقق من الخدمة نفسها | `systemctl status <service>` <br> `curl http://localhost` |
| 11 | تتبع المسار للشبكة | `traceroute 8.8.8.8` |
| 12 | فحص الباكتات | `tcpdump -i eth0 port 80` |
| 13 | فحص البورت من الخارج | `nmap <Server_IP>` <br> `telnet <Server_IP> 22` |

---

## 🔍 مثال عملي (Case Study)

**المشكلة**: العميل غير قادر على الدخول على موقع Apache.  

### الحل:
1. تأكد أن Apache يعمل:  
   ```bash
   systemctl status httpd
   systemctl start httpd
