package bit.project.server.controller;

import bit.project.server.UsecaseList;
import bit.project.server.dao.CustomerDao;
import bit.project.server.entity.Customer;
import bit.project.server.util.security.AccessControlManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/dashboard")

public class DashboardController {
    @Autowired
    public CustomerDao customerDao;

    @Autowired
    public AccessControlManager accessControlManager;

    @GetMapping("/recent-customer-count")
    public HashMap getRecentCustomerCount(HttpServletRequest request) {
        accessControlManager.authorize(request, "No privilaege to get recent customer count", UsecaseList.SHOW_ALL_CUSTOMERS);

        LocalDateTime timeWeekAgo = LocalDateTime.now().minusWeeks(1);
        List<Customer> recentcutomers = customerDao.findAllByTocreationAfter(timeWeekAgo);

        HashMap<String, Integer> data = new HashMap();

        data.put("count", recentcutomers.size());

        return data;

    }
}
